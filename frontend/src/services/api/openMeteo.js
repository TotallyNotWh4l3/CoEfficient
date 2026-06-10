import {
    getCachedWeather,
    isCacheValid,
    setCachedWeather,
} from "../utils/weatherCache.js";

// openMeteo.js
import {
    getWeatherFromDB,
    saveWeatherToDB,
    isWeatherValid,
} from "../utils/weatherCache.js";

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
        wind_speed_unit: "ms",
    });
    return `https://api.open-meteo.com/v1/forecast?${params}`;
}

export async function fetchWeatherData(forceRefresh = false) {
    try {
        // 1. Try to get from database
        const dbData = await getWeatherFromDB();

        // 2. If no data in DB, fetch from API
        if (!dbData) {
            console.log(
                "[WEATHER API]: No data in DB. Fetching from Open-Meteo...",
            );
            const apiData = await fetchFromAPI();
            await saveWeatherToDB(apiData);
            return apiData;
        }

        // 3. Check if data is valid (≤16 minutes old)
        const isValid = isWeatherValid(dbData.timestamp);

        // 4. If data is stale, fetch new data
        if (!isValid) {
            console.log(
                "[WEATHER API]: Data is stale. Fetching from Open-Meteo...",
            );
            const apiData = await fetchFromAPI();
            await saveWeatherToDB(apiData);
            return apiData;
        }

        // 5. If force refresh (sync time), fetch new data
        if (forceRefresh) {
            console.log(
                "[WEATHER API]: Force refresh. Fetching from Open-Meteo...",
            );
            const apiData = await fetchFromAPI();
            await saveWeatherToDB(apiData);
            return apiData;
        }

        // 6. Data is fresh, use from DB
        console.log("[WEATHER API]: Using fresh data from DB...");
        return dbData;
    } catch (err) {
        console.error("[WEATHER API]: Error:", err);
        throw err;
    }
}

async function fetchFromAPI() {
    const url = buildApiUrl();
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    console.log("[WEATHER API]: Fetched from Open-Meteo");
    return data;
}
