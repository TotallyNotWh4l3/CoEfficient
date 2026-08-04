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

    if (!locationId) {
        throw new Error("Location id is required for weather caching.");
    }

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
        throw new Error("Invalid coordinates.");
    }

    // 1. Check cache
    const cached = await getCachedWeather(locationId);

    if (cached) {
        console.log("[Weather] Cache hit.");

        return cached;
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
