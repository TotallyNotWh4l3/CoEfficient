import express from "express";
import db from "../database/database.js";

const router = express.Router();

// GET latest weather data
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

        res.json({
            ...JSON.parse(row.data),
            timestamp: row.timestamp,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST save weather data
router.post("/save", async (req, res) => {
    try {
        const { location_id = 1 } = req.body;
        const timestamp = Date.now();

        const query = `
            INSERT INTO weather_data (location_id, timestamp, data)
            VALUES (?, ?, ?)
        `;
        await db.run(query, [location_id, timestamp, JSON.stringify(req.body)]);

        res.json({ success: true, timestamp });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
