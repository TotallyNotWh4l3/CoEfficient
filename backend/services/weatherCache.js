const weatherCache = new Map();

/**
 * Builds a unique cache key for a location.
 */
function getCacheKey(latitude, longitude) {
    return `${latitude},${longitude}`;
}

/**
 * Open-Meteo updates around:
 *
 * XX:00
 * XX:15
 * XX:30
 * XX:45
 *
 * We intentionally refresh at:
 *
 * XX:01
 * XX:16
 * XX:31
 * XX:46
 */
function getLatestWeatherTimestamp(now = new Date()) {
    const latest = new Date(now);

    latest.setSeconds(0);
    latest.setMilliseconds(0);

    const minute = latest.getMinutes();

    if (minute >= 46) {
        latest.setMinutes(45);
    } else if (minute >= 31) {
        latest.setMinutes(30);
    } else if (minute >= 16) {
        latest.setMinutes(15);
    } else if (minute >= 1) {
        latest.setMinutes(0);
    } else {
        // Between XX:00:00 and XX:00:59
        // Previous update is XX:45
        latest.setHours(latest.getHours() - 1);
        latest.setMinutes(45);
    }

    return latest.toISOString();
}

/**
 * Determines whether the cached weather is still valid.
 */
function isCacheValid(cacheEntry) {
    if (!cacheEntry) {
        return false;
    }

    return cacheEntry.weatherTimestamp === getLatestWeatherTimestamp();
}

/**
 * Returns cached weather if it's still valid.
 */
export function getCachedWeather(latitude, longitude) {
    const key = getCacheKey(latitude, longitude);

    const cache = weatherCache.get(key);

    if (!isCacheValid(cache)) {
        return null;
    }

    return cache.data;
}

/**
 * Saves formatted weather.
 */
export function setCachedWeather(latitude, longitude, weatherTimestamp, data) {
    const key = getCacheKey(latitude, longitude);

    weatherCache.set(key, {
        weatherTimestamp,
        data,
        cachedAt: new Date().toISOString(),
    });
}

/**
 * Clears a specific location.
 */
export function clearCachedWeather(latitude, longitude) {
    weatherCache.delete(getCacheKey(latitude, longitude));
}

/**
 * Clears everything.
 */
export function clearAllWeatherCache() {
    weatherCache.clear();
}

/**
 * Debug helper.
 */
export function getWeatherCache() {
    return weatherCache;
}
