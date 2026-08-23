import { fetchWeather } from "./openMeteoService.js";
import {
    getCachedWeather,
    setCachedWeather,
    getLatestWeatherTimestamp,
} from "./weatherDataStore.js";
import { formatWeather } from "./weatherFormatter.js";

/**
 * @param {{ id: string, latitude: number, longitude: number, timezone?: string }} location
 */
export async function getWeather(location) {
    const { id: locationId, timezone = "Asia/Tokyo" } = location;

    const latitude = Number(location.latitude);
    const longitude = Number(location.longitude);

    // Still nothing — fall back to the user's built-in default, then
    // to whatever's first. If the table is empty, sync from settings.
    if (!location) {
        let locations = await Location.findAllByUserId(req.user.id);

        if (locations.length === 0) {
            const userSettings = await UserSettings.findByUserId(req.user.id);
            const settingsLocations = userSettings?.settings?.locations ?? [];

            for (const loc of settingsLocations) {
                await Location.create({
                    id: loc.id,
                    userId: req.user.id,
                    name: loc.name,
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                    timezone: loc.timezone ?? "Asia/Tokyo",
                    builtIn: Boolean(loc.builtIn),
                });
            }

            locations = await Location.findAllByUserId(req.user.id);
        }

        location = locations.find((l) => l.builtIn) ?? locations[0] ?? null;
    }

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
        throw new Error("Invalid coordinates.");
    }

    // 1. Check cache
    const cached = await getCachedWeather(locationId);

    if (cached) {
        const ageMs = Date.now() - new Date(cached.fetched_at).getTime();
        const FIFTEEN_MIN = 15 * 60 * 1000;

        if (ageMs <= FIFTEEN_MIN) {
            console.log("[Weather] Cache hit.");
            return cached;
        }

        console.log("[Weather] Cache stale, refetching...");
    }

    console.log("[Weather] Fetching Open-Meteo...");

    // 2. Fetch raw weather
    const raw = await fetchWeather(latitude, longitude, timezone);

    // 3. Format response
    const formatted = formatWeather(raw);

    // 4. Store cache
    await setCachedWeather(locationId, getLatestWeatherTimestamp(), formatted);

    // 5. Return formatted weather
    return formatted;
}
