import WeatherData from "../models/WeatherData.js";

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
export function getLatestWeatherTimestamp(now = new Date()) {
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
        latest.setHours(latest.getHours() - 1);
        latest.setMinutes(45);
    }

    return latest.toISOString();
}

// Returns the raw cache row (or null) with no freshness judgement made here —
// callers decide staleness themselves off the payload's own data (e.g.
// payload.current.time), since that's what actually reflects how current
// the weather data is, as opposed to when it happened to be stored.
export async function getCachedWeatherRow(locationId) {
    return WeatherData.findByLocationId(locationId);
}

export async function setCachedWeather(locationId, weatherTimestamp, data) {
    return WeatherData.upsert(locationId, weatherTimestamp, data);
}

export async function clearCachedWeather(locationId) {
    return WeatherData.deleteByLocationId(locationId);
}
