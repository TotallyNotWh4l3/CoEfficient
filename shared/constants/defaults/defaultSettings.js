import { DARK_DEFAULT_THEME } from "../themes/darkDefault.js";
import { LIGHT_DEFAULT_THEME } from "../themes/lightDefault.js";

const DEFAULT_THEMES = [DARK_DEFAULT_THEME, LIGHT_DEFAULT_THEME];

export const DEFAULT_SETTINGS = {
    preferences: {
        language: "en",
        locationId: "default-location",
        appearance: {
            currentTheme: "dark-default",
        },
    },

    locations: [
        {
            id: "default-location",
            name: "Tokyo, Shibuya",
            latitude: 35.661991,
            longitude: 139.704138,
            timezone: "Asia/Tokyo",
            builtIn: true,
        },
    ],

    themes: DEFAULT_THEMES,

    moduleDefaults: {
        weather: {
            title: "Weather",
            city: "Tokyo",
            view: "conditions",
        },

        schedule: {
            title: "Schedule",
        },

        announcement: {
            title: "Announcements",
        },
    },
};
