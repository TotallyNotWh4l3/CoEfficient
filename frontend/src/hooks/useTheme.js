import { useEffect } from "react";
import { useSettings } from "./useSettings";

function toKebabCase(value) {
    return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

export function useTheme() {
    const { settings, loading } = useSettings();

    useEffect(() => {
        if (loading || !settings) return;

        const themeId = settings?.preferences?.appearance?.currentTheme;
        console.log("themeId:", themeId);
        console.log("themes:", settings.themes);

        const theme = settings?.themes?.find((theme) => theme.id === themeId);

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
        applyGroup("color", theme.appearance.interactive);
        applyGroup("shadow", theme.appearance.shadows);

        console.log("[Theme] Applied:", theme.name);
    }, [settings, loading]);
}
