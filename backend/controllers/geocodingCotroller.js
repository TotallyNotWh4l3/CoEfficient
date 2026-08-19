// backend/controllers/geocodingController.js
import { forwardGeocode, reverseGeocode } from "../services/geocodingService.js";

const geocodingController = {
    // GET /api/geocoding/search?q=Tokyo
    async search(req, res) {
        const query = req.query.q?.trim();
        if (!query) {
            return res.status(400).json({ message: "Query parameter 'q' is required." });
        }

        try {
            const results = await forwardGeocode(query);
            res.json(results);
        } catch (error) {
            console.error(error);
            res.status(502).json({ message: "Geocoding search failed." });
        }
    },

    // GET /api/geocoding/reverse?lat=35.68&lon=139.69
    async reverse(req, res) {
        const lat = Number(req.query.lat);
        const lon = Number(req.query.lon);

        if (Number.isNaN(lat) || Number.isNaN(lon)) {
            return res
                .status(400)
                .json({ message: "Valid 'lat' and 'lon' query params are required." });
        }

        try {
            const name = await reverseGeocode(lat, lon);
            res.json({ name });
        } catch (error) {
            console.error(error);
            res.status(502).json({ message: "Reverse geocoding failed." });
        }
    },
};

export default geocodingController;
