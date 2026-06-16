import express from "express";
import db from "../database/database.js";

const router = express.Router();

// GET latest weather data from DB
router.get("/get", async (req, res) => {
    try {
        const query = `
            SELECT data, timestamp 
            FROM weather_data 
            ORDER BY timestamp DESC 
            LIMIT 1
        `;
        const row = await db.get(query);

        if (!row) {
            return res.status(404).json({ error: "No weather data found" });
        }

        res.json(JSON.parse(row.data));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST save weather data to DB
router.post("/save", async (req, res) => {
    try {
        const timestamp = Date.now();

        await db.run(
            "INSERT INTO weather_data (location_id, timestamp, data) VALUES (?, ?, ?)",
            [1, timestamp, JSON.stringify(req.body)],
        );

        res.json({ success: true, timestamp });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET weather from Open-Meteo API (proxy)
router.get("/proxy", async (req, res) => {
    try {
        const latitude = req.query.latitude || 34.666166;
        const longitude = req.query.longitude || 136.50195785696147;

        const params = new URLSearchParams({
            latitude: latitude,
            longitude: longitude,
            current:
                "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m",
            daily: "weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,uv_index_max,precipitation_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant",
            hourly: "temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,visibility,wind_speed_10m,wind_gusts_10m,uv_index",
            timezone: "Asia/Tokyo",
            wind_speed_unit: "ms",
        });

        const url = `https://api.open-meteo.com/v1/forecast?${params}`;
        console.log("[WEATHER PROXY]: Fetching from Open-Meteo:", url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Open-Meteo API Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("[WEATHER PROXY]: Data received from Open-Meteo");
        res.json(data);
    } catch (err) {
        console.error("[WEATHER PROXY]: Error:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
