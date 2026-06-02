import express from "express";

const router = express.Router();

router.get("/reverse", async (req, res) => {
    const { latitude, longitude } = req.query;

    try {
        console.log(`[LOCATION] Reverse geocoding: ${latitude}, ${longitude}`);

        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            { headers: { "User-Agent": "Co:Efficient/1.0" } },
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("[LOCATION] Reverse geocoding failed:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/search", async (req, res) => {
    const { locationName } = req.query;

    try {
        console.log(`[LOCATION] Forward geocoding: ${locationName}`);

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`,
            { headers: { "User-Agent": "Co:Efficient/1.0" } },
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("[LOCATION] Forward geocoding failed:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
