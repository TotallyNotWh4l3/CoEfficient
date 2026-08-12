export default {
    dashboard: {
        header: {
            title: "Co:Efficient",
            subTitle: "Updates",
        },
    },

    settings: {
        // =====================================================
        // General
        // =====================================================

        title: "Settings",
        autoSave: "Auto-saved",

        // =====================================================
        // Sidebar
        // =====================================================

        sidebar: {
            interface: "Interface",
            dashboard: "Dashboard",
            modules: "Modules",
            about: "About",
        },

        // =====================================================
        // Interface
        // =====================================================

        interface: {
            title: "Interface",
            description: "Application appearance and language settings",

            language: {
                title: "Language",
                description: "Application language selection",

                add: "Add Location",
            },

            appearance: {
                title: "Appearance",
                description: "Visual options and UI styling",

                current: "Current theme",

                themes: {
                    title: "Themes",
                    description: "Built-in or custom themes",

                    builtIn: "Built-in",
                    custom: "Custom",

                    apply: "Apply",
                    create: "Create",
                    edit: "Edit",
                    delete: "Delete",
                },

                customization: {
                    title: "Customization",
                    description: "Colors, typography, borders, and effects",

                    colors: "Colors",
                    typography: "Typography",
                    borders: "Borders",
                    effects: "Effects",
                },
            },

            location: {
                title: "Location",
                description: "Manage locations used by the application.",

                current: {
                    title: "Default Location",
                    description: "Choose the location used as the default.",
                },

                add: "Add Location",
                empty: "No saved locations.",
            },
        },

        // =====================================================
        // Dashboard
        // =====================================================

        dashboard: {
            title: "Dashboard",
            description: "Default layout for new dashboards",

            layout: {
                title: "Layout",
                description: "Spacing and column configurations",

                columns: "Columns",
                gap: "Spacing",
                padding: "Padding",
            },
        },

        // =====================================================
        // Modules
        // =====================================================

        modules: {
            title: "Modules",
            description: "Default behavior configs for modules",

            weather: {
                title: "Weather",
            },

            schedule: {
                title: "Schedule",
            },

            announcements: {
                title: "Announcements",
            },
        },

        // =====================================================
        // About
        // =====================================================

        about: {
            title: "About",
            description: "App information and credits",
        },
    },
};
