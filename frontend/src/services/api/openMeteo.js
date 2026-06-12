// openMeteo.js
import { fetchWeatherApi } from "openmeteo";
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

async function fetchFromAPI() {
    const params = {
        latitude: cfg.latitude,
        longitude: cfg.longitude,
        daily: [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "apparent_temperature_max",
            "apparent_temperature_min",
            "sunrise",
            "sunset",
            "daylight_duration",
            "uv_index_max",
            "precipitation_sum",
            "precipitation_hours",
            "precipitation_probability_max",
            "wind_speed_10m_max",
            "wind_gusts_10m_max",
            "wind_direction_10m_dominant",
        ],
        hourly: [
            "temperature_2m",
            "relative_humidity_2m",
            "dew_point_2m",
            "apparent_temperature",
            "precipitation_probability",
            "precipitation",
            "weather_code",
            "visibility",
            "wind_speed_10m",
            "wind_gusts_10m",
            "uv_index",
        ],
        current: [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "is_day",
            "precipitation",
            "weather_code",
            "cloud_cover",
            "wind_speed_10m",
            "wind_direction_10m",
            "wind_gusts_10m",
        ],
        timezone: "Asia/Tokyo",
        wind_speed_unit: "ms",
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Get first response
    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();

    // Extract current data
    const current = response.current();
    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature_2m: current.variables(0).value(),
            relative_humidity_2m: current.variables(1).value(),
            apparent_temperature: current.variables(2).value(),
            is_day: current.variables(3).value(),
            precipitation: current.variables(4).value(),
            weather_code: current.variables(5).value(),
            cloud_cover: current.variables(6).value(),
            wind_speed_10m: current.variables(7).value(),
            wind_direction_10m: current.variables(8).value(),
            wind_gusts_10m: current.variables(9).value(),
        },
        hourly: {
            time: Array.from(
                {
                    length:
                        (Number(response.hourly().timeEnd()) -
                            Number(response.hourly().time())) /
                        response.hourly().interval(),
                },
                (_, i) =>
                    new Date(
                        (Number(response.hourly().time()) +
                            i * response.hourly().interval() +
                            utcOffsetSeconds) *
                            1000,
                    ),
            ),
            temperature_2m: response.hourly().variables(0).valuesArray(),
            relative_humidity_2m: response.hourly().variables(1).valuesArray(),
            dew_point_2m: response.hourly().variables(2).valuesArray(),
            apparent_temperature: response.hourly().variables(3).valuesArray(),
            precipitation_probability: response
                .hourly()
                .variables(4)
                .valuesArray(),
            precipitation: response.hourly().variables(5).valuesArray(),
            weather_code: response.hourly().variables(6).valuesArray(),
            visibility: response.hourly().variables(7).valuesArray(),
            wind_speed_10m: response.hourly().variables(8).valuesArray(),
            wind_gusts_10m: response.hourly().variables(9).valuesArray(),
            uv_index: response.hourly().variables(10).valuesArray(),
        },
        daily: {
            time: Array.from(
                {
                    length:
                        (Number(response.daily().timeEnd()) -
                            Number(response.daily().time())) /
                        response.daily().interval(),
                },
                (_, i) =>
                    new Date(
                        (Number(response.daily().time()) +
                            i * response.daily().interval() +
                            utcOffsetSeconds) *
                            1000,
                    ),
            ),
            weather_code: response.daily().variables(0).valuesArray(),
            temperature_2m_max: response.daily().variables(1).valuesArray(),
            temperature_2m_min: response.daily().variables(2).valuesArray(),
            apparent_temperature_max: response
                .daily()
                .variables(3)
                .valuesArray(),
            apparent_temperature_min: response
                .daily()
                .variables(4)
                .valuesArray(),
            sunrise: [
                ...Array(response.daily().variables(5).valuesInt64Length()),
            ].map(
                (_, i) =>
                    new Date(
                        (Number(response.daily().variables(5).valuesInt64(i)) +
                            utcOffsetSeconds) *
                            1000,
                    ),
            ),
            sunset: [
                ...Array(response.daily().variables(6).valuesInt64Length()),
            ].map(
                (_, i) =>
                    new Date(
                        (Number(response.daily().variables(6).valuesInt64(i)) +
                            utcOffsetSeconds) *
                            1000,
                    ),
            ),
            daylight_duration: response.daily().variables(7).valuesArray(),
            uv_index_max: response.daily().variables(8).valuesArray(),
            precipitation_sum: response.daily().variables(9).valuesArray(),
            precipitation_hours: response.daily().variables(10).valuesArray(),
            precipitation_probability_max: response
                .daily()
                .variables(11)
                .valuesArray(),
            wind_speed_10m_max: response.daily().variables(12).valuesArray(),
            wind_gusts_10m_max: response.daily().variables(13).valuesArray(),
            wind_direction_10m_dominant: response
                .daily()
                .variables(14)
                .valuesArray(),
        },
    };

    console.log("[WEATHER API]: Fetched from Open-Meteo");
    return weatherData;
}

export async function fetchWeatherData(forceRefresh = false) {
    try {
        // 1. Try to get from cache
        const cachedData = getCachedWeather();

        // 2. If no data in cache, fetch from API
        if (!cachedData) {
            console.log(
                "[WEATHER API]: No data in cache. Fetching from Open-Meteo...",
            );
            const apiData = await fetchFromAPI();
            setCachedWeather(apiData);
            return apiData;
        }

        // 3. Check if data is valid (≤16 minutes old)
        const isValid = isWeatherValid(cachedData.timestamp);

        // 4. If data is stale, fetch new data
        if (!isValid) {
            console.log(
                "[WEATHER API]: Data is stale. Fetching from Open-Meteo...",
            );
            const apiData = await fetchFromAPI();
            setCachedWeather(apiData);
            return apiData;
        }

        // 5. If force refresh (sync time), fetch new data
        if (forceRefresh) {
            console.log(
                "[WEATHER API]: Force refresh. Fetching from Open-Meteo...",
            );
            const apiData = await fetchFromAPI();
            setCachedWeather(apiData);
            return apiData;
        }

        // 6. Data is fresh, use from cache
        console.log("[WEATHER API]: Using fresh data from cache...");
        return cachedData.data;
    } catch (err) {
        console.error("[WEATHER API]: Error:", err);
        throw err;
    }
}
