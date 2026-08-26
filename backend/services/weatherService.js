import { fetchWeather } from "./openMeteoService.js";
import {
    getCachedWeatherRow,
    setCachedWeather,
    getLatestWeatherTimestamp,
    claimFetch,
    releaseFetchClaim,
} from "./weatherDataStore.js";
import { formatWeather } from "./weatherFormatter.js";

const FIFTEEN_MIN_MS = 15 * 60 * 1000;

// Same-instance dedup: if two requests for the same location arrive while
// a fetch is already in flight on this warm serverless instance, the
// second one awaits the first's result instead of starting a duplicate
// Open-Meteo call. This only helps when Vercel happens to route both
// requests to the same instance — it does NOT protect against separate
// concurrent instances, which share no memory. That cross-instance case
// is handled by the DB-level claim below.
const inFlightFetches = new Map();

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
    const row = await getCachedWeatherRow(locationId);

    if (row?.payload?._dataTimestampUtc) {
        const dataAgeMs = Date.now() - new Date(row.payload._dataTimestampUtc).getTime();

        if (dataAgeMs >= 0 && dataAgeMs <= FIFTEEN_MIN_MS) {
            console.log("[Weather] Cache hit.");
            return stripInternalFields(row.payload);
        }

        console.log("[Weather] Cached data older than 15min (or clock skew), refetching...");
    } else {
        console.log("[Weather] No cache, fetching Open-Meteo...");
    }

    // 2. Dedup concurrent refetches for the same location on this instance
    if (inFlightFetches.has(locationId)) {
        console.log("[Weather] Refetch already in flight on this instance, joining it.");
        return inFlightFetches.get(locationId);
    }

    const fetchPromise = refetchAndCache(locationId, latitude, longitude, timezone).finally(() => {
        inFlightFetches.delete(locationId);
    });

    inFlightFetches.set(locationId, fetchPromise);
    return fetchPromise;
}

async function refetchAndCache(locationId, latitude, longitude, timezone) {
    // 3. Cross-instance claim — only one concurrent request across all
    // Vercel instances should actually hit Open-Meteo for this location.
    const wonClaim = await claimFetch(locationId);

    if (!wonClaim) {
        const existing = await getCachedWeatherRow(locationId);
        const hasUsableCache = existing?.payload && Object.keys(existing.payload).length > 0;

        if (hasUsableCache) {
            console.log("[Weather] Lost the cross-instance fetch race, serving existing cache.");
            return stripInternalFields(existing.payload);
        }

        // No usable cache exists yet (e.g. very first request for this
        // location racing another) — fetch anyway rather than returning
        // nothing, just without holding the claim ourselves.
        console.log("[Weather] Lost the claim but no usable cache exists yet — fetching anyway.");
    }

    try {
        const raw = await fetchWeather(latitude, longitude, timezone);
        const formatted = formatWeather(raw);

        // Open-Meteo's current.time is a naive local-time string in the
        // requested timezone (e.g. "2026-08-26T23:45" for Asia/Tokyo) — it
        // has no UTC offset attached. Parsing that directly with
        // `new Date(...)` on a UTC-running server (Vercel) silently treats
        // it as if it were already UTC, which is wrong by the location's
        // UTC offset. Convert using utc_offset_seconds (top-level on every
        // Open-Meteo response) for internal cache-freshness checks only —
        // current.time itself is left untouched so existing frontend
        // display logic isn't affected.
        const utcOffsetSeconds = raw.utc_offset_seconds ?? 0;
        const dataTimestampMs = Date.parse(`${raw.current.time}Z`) - utcOffsetSeconds * 1000;
        formatted._dataTimestampUtc = new Date(dataTimestampMs).toISOString();

        // 4. Store cache (this also clears the claim on success)
        await setCachedWeather(locationId, getLatestWeatherTimestamp(), formatted);

        return stripInternalFields(formatted);
    } catch (error) {
        // Only release if we actually held the claim — never clear a
        // claim we don't own.
        if (wonClaim) {
            await releaseFetchClaim(locationId);
        }
        throw error;
    }
}

function stripInternalFields(payload) {
    const { _dataTimestampUtc, ...rest } = payload;
    return rest;
}
