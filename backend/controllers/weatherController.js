import UserSettings from "../models/UserSettings.js";
import { getWeather } from "../services/weatherService.js";

export async function getWeatherController(req, res) {
    try {
        console.log("[Weather] User:", req.user);
        const userSettings = await UserSettings.findByUserId(req.user.id);

        if (!userSettings) {
            return res.status(404).json({
                message: "User settings not found.",
            });
        }

        const settings = userSettings.settings;

        const locationId = settings.preferences.preferences.locationId;

        const location = settings.locations.find((location) => location.id === locationId);

        if (!location) {
            return res.status(400).json({
                message: "Selected location not found.",
            });
        }

        const weather = await getWeather(
            location.latitude,
            location.longitude,
            location.timezone ?? "Asia/Tokyo",
        );

        res.json(weather);
    } catch (error) {
        console.error("[Weather]", error);

        res.status(500).json({
            message: error.message,
        });
    }
}
