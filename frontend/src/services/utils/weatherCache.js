// weatherCache.js
const CACHE_KEY = "weather_cache";

export function getCachedWeather() {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) {
            console.log("[WEATHER CACHE]: Data non-existent");
            return null;
        }

        const cache = JSON.parse(cached);
        console.log("[WEATHER CACHE]: Data retrieved from cache");
        return cache;
    } catch (err) {
        console.error("[WEATHER CACHE]: Parse error:", err);
        console.log("[WEATHER CACHE]: Data unable to get");
        return null;
    }
}

export function setCachedWeather(data) {
    try {
        const cacheData = {
            data: data,
            timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        console.log("[WEATHER CACHE]: Data saved to cache");
    } catch (err) {
        console.error("[WEATHER CACHE]: Save error:", err);
    }
}

export function isWeatherValid(timestamp, maxAgeMs = 16 * 60 * 1000) {
    if (!timestamp) return false;

    const age = Date.now() - timestamp;
    const minutes = Math.floor(age / (1000 * 60));
    const seconds = Math.floor((age / 1000) % 60);

    const isValid = age < maxAgeMs;
    console.log(
        `[WEATHER CACHE]: Data validity: ${isValid ? "VALID" : "STALE"} (Age: ${minutes}m${seconds.toString().padStart(2, "0")}s)`,
    );

    return isValid;
}

export function clearCache() {
    try {
        localStorage.removeItem(CACHE_KEY);
        console.log("[WEATHER CACHE]: Cache cleared");
    } catch (err) {
        console.error("[WEATHER CACHE]: Clear error:", err);
    }
}
