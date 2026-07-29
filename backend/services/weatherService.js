import { fetchWeather } from "./openMeteoService.js";

import { getCachedWeather, setCachedWeather } from "./weatherCache.js";

import { formatWeather } from "./weatherFormatter.js";

export async function getWeather(latitude, longitude, timezone = "Asia/Tokyo") {
    latitude = Number(latitude);
    longitude = Number(longitude);

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
        throw new Error("Invalid coordinates.");
    }

    // 1. Check cache
    const cached = getCachedWeather(latitude, longitude);

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
    setCachedWeather(latitude, longitude, raw.current.time, formatted);

    // 5. Return formatted weather
    return formatted;
}
