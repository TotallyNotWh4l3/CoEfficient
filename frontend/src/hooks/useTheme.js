import { useEffect } from "react";
import { useSettings } from "./useSettings";
import { useThemes } from "./useThemes";

function toKebabCase(value) {
    return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

export function useTheme() {
    const { settings, loading: settingsLoading } = useSettings();
    const { themes, loading: themesLoading } = useThemes();

    useEffect(() => {
        if (settingsLoading || themesLoading || !settings) return;

        const themeId = settings?.preferences?.appearance?.currentTheme;
        const theme = themes.find((t) => t.id === themeId);

        if (!theme) {
            console.warn("[Theme] Theme not found:", themeId);
            return;
        }

        const root = document.documentElement;

        const applyGroup = (prefix, values) => {
            if (!values) return;
            Object.entries(values).forEach(([key, value]) => {
                root.style.setProperty(`--${prefix}-${toKebabCase(key)}`, value);
            });
        };

        applyGroup("color", theme.appearance.colors);
        applyGroup("shadow", theme.appearance.shadows);
    }, [settings, settingsLoading, themes, themesLoading]);
}
