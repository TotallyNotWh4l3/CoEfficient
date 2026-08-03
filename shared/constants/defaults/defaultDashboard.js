export const DEFAULT_DASHBOARD = {
    id: "default-dashboard",

    name: "Main Dashboard",

    layout: {
        columns: 3,
        gap: 16,
        padding: 16,
    },

    modules: [
        {
            id: "weather-default",

            type: "weather",

            settings: {
                title: "Weather",
                location: "default-location",
                view: "conditions",
            },

            layout: {
                w: 2,
                h: 2,
            },
        },
    ],
};
