// openMeteo.js
import {
    getCachedWeather,
    setCachedWeather,
    isWeatherValid,
} from "../utils/weatherCache.js";

const cfg = {
    latitude: parseFloat(localStorage.getItem("weather_latitude")) || 34.666166,
    longitude:
        parseFloat(localStorage.getItem("weather_longitude")) ||
        136.50195785696147,
    timezone: "Asia/Tokyo",
};

const BACKEND_URL =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

function buildApiUrl() {
    const params = new URLSearchParams({
        latitude: cfg.latitude,
        longitude: cfg.longitude,
        current:
            "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m",
        daily: "weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,uv_index_max,precipitation_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant",
        hourly: "temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,visibility,wind_speed_10m,wind_gusts_10m,uv_index",
        timezone: "Asia/Tokyo",
        wind_speed_unit: "ms",
    });
    return `https://api.open-meteo.com/v1/forecast?${params}`;
}

// Try direct API first
async function fetchFromDirectAPI() {
    const url = buildApiUrl();
    console.log("[WEATHER API]: Trying direct API call...");

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId); // Clear timeout BEFORE checking response

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("[WEATHER API]: Direct API call successful");
        return { success: true, data };
    } catch (err) {
        if (err.name === "AbortError") {
            console.warn("[WEATHER API]: Direct API call timed out (5s)");
        } else {
            console.warn("[WEATHER API]: Direct API call failed:", err.message);
        }
        return { success: false, error: err };
    }
}
// Fallback to backend proxy
async function fetchFromBackendProxy() {
    const proxyUrl = `${BACKEND_URL}/api/weather/proxy?latitude=${cfg.latitude}&longitude=${cfg.longitude}`;
    console.log("[WEATHER API]: Trying backend proxy...");

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(proxyUrl, { signal: controller.signal });
        clearTimeout(timeoutId); // Clear timeout BEFORE checking response

        if (!response.ok) {
            throw new Error(`Backend Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("[WEATHER API]: Backend proxy call successful");
        return { success: true, data };
    } catch (err) {
        // Check if it's a timeout error
        if (err.name === "AbortError") {
            console.warn("[WEATHER API]: Backend proxy call timed out (5s)");
        } else {
            console.warn(
                "[WEATHER API]: Backend proxy call failed:",
                err.message,
            );
        }
        return { success: false, error: err };
    }
}

async function fetchFromAPI() {
    // Try direct API first
    const directResult = await fetchFromDirectAPI();
    if (directResult.success) {
        return directResult.data;
    }

    // If direct fails, try backend proxy
    console.log(
        "[WEATHER API]: Direct API failed, falling back to backend proxy...",
    );
    const backendResult = await fetchFromBackendProxy();
    if (backendResult.success) {
        return backendResult.data;
    }

    // Both failed
    throw new Error("Both direct API and backend proxy failed");
}

export async function fetchWeatherData() {
    try {
        // 1. Check if there's data in cache
        const cachedData = getCachedWeather();

        if (!cachedData) {
            // 1.1 No data → Fetch API
            console.log("[WEATHER API]: No cached data. Fetching from API...");
            const apiData = await fetchFromAPI();
            setCachedWeather(apiData);
            return apiData;
        }

        // 2. Data exists → Check validity
        const isValid = isWeatherValid(cachedData.timestamp);

        if (isValid) {
            // 2.1 Valid → Use cached data, end
            console.log("[WEATHER API]: Cached data is valid. Using it...");
            return cachedData.data;
        }

        // 2.2 Not valid → Fetch new API
        if (!isValid) {
            console.log(
                "[WEATHER API]: Cached data is stale. Fetching new data...",
            );
            const apiData = await fetchFromAPI();
            setCachedWeather(apiData);
            return apiData;
        }
    } catch (err) {
        console.error("[WEATHER API]: Error:", err);
        throw err;
    }
}
