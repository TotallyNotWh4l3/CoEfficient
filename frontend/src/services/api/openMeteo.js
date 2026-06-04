import { getCachedWeather, isCacheValid, setCachedWeather } from "../utils/weatherCache.js";

const cfg = {
    latitude:
        parseFloat(localStorage.getItem("weather_latitude")) ||
        34.665858345191744,
    longitude:
        parseFloat(localStorage.getItem("weather_longitude")) ||
        136.50132661882844,
    timezone: "Asia/Tokyo",
};

function buildApiUrl() {
    const params = new URLSearchParams({
        latitude: cfg.latitude,
        longitude: cfg.longitude,
        daily: `
            weather_code,
            temperature_2m_max,
            temperature_2m_min,
            apparent_temperature_max,
            apparent_temperature_min,
            sunset,
            sunrise,
            daylight_duration,
            uv_index_max,
            precipitation_sum,
            precipitation_probability_max,
            precipitation_hours,
            wind_speed_10m_max,
            wind_direction_10m_dominant,
            wind_gusts_10m_max
            `.replace(/\s+/g, ""),
        hourly: `
            temperature_2m,
            relative_humidity_2m,
            dew_point_2m,
            weather_code,
            precipitation_probability,
            precipitation,
            wind_speed_10m
            `.replace(/\s+/g, ""),
        current: `
            temperature_2m,
            relative_humidity_2m,
            apparent_temperature,
            is_day,
            precipitation,
            weather_code,
            wind_speed_10m,
            wind_gusts_10m
            `.replace(/\s+/g, ""),
        timezone: "Asia/Tokyo",
        past_days: 0,
        forecast_days: 8,
        timeformat: "unixtime",
        wind_speed_unit: "ms"
    });
    return `https://api.open-meteo.com/v1/forecast?${params}`;
}

export async function fetchWeatherData(forceRefresh = false) {

    if (!forceRefresh && isCacheValid()) {
        console.log('[WEATHER API]: Using cached data');
        const cached = getCachedWeather();
        return cached.data;
    }

    console.log("[WEATHER API]: Fetching from Open-Meteo")
    const url = buildApiUrl();

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();

        setCachedWeather(data);
        return data;
    } catch (err) {
        console.error("[WEATHER API]: Fetch error: ", err);
        throw err;
    }
}