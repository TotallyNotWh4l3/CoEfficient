import UserSettings from "../models/UserSettings.js";
import { getWeather } from "../services/weatherService.js";

export async function getWeatherController(req, res) {
    try {
        console.log("========== WEATHER REQUEST ==========");
        console.log("[Weather] User:", req.user);

        const userSettings = await UserSettings.findByUserId(req.user.id);

        console.log("[Weather] User Settings:", userSettings);

        if (!userSettings) {
            return res.status(404).json({
                message: "User settings not found.",
            });
        }

        const settings = userSettings.settings;

        console.log("[Weather] Settings:", settings);

        const locationId =
            settings.preferences?.locationId ?? settings.preferences?.preferences?.locationId;

        console.log("[Weather] Selected Location ID:", locationId);

        console.log("[Weather] Available Locations:", settings.locations);

        const location = settings.locations.find((location) => location.id === locationId);

        console.log("[Weather] Selected Location:", location);

        if (!location) {
            return res.status(404).json({
                message: "Selected location not found.",
            });
        }

        const weather = await getWeather(
            location.latitude,
            location.longitude,
            location.timezone ?? "Asia/Tokyo",
        );

        weather.location = {
            ...weather.location,
            name: location.name,
        };

        console.log("[Weather] Weather fetched successfully.");
        console.log("=====================================");

        res.json(weather);
    } catch (error) {
        console.error("[Weather]", error);

        res.status(500).json({
            message: error.message,
        });
    }
}
