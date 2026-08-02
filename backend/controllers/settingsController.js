import UserSettings from "../models/UserSettings.js";

async function getSettings(req, res) {
    try {
        const settings = await UserSettings.findByUserId(req.user.id);

        if (!settings) {
            return res.status(404).json({
                message: "User settings not found.",
            });
        }

        res.json(settings.settings);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to load settings.",
        });
    }
}

async function updateSettings(req, res) {
    try {
        await UserSettings.upsert(req.user.id, req.body);

        res.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to save settings.",
        });
    }
}

export default {
    getSettings,
    updateSettings,
};
