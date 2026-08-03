import { useState, useEffect, useCallback, useRef } from "react";

import { useSettingsContext } from "../context/SettingsContext";
import * as SettingsService from "../services/settingsService";

export function useSettingsState(user) {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    // Ref to skip auto-save on initial fetch
    const isInitialMount = useRef(true);

    // =====================================================
    // Load Settings
    // =====================================================

    useEffect(() => {
        const token = localStorage.getItem("co-efficient-token");

        // Check for user existence (supports user.id, user._id, or user.email)
        const hasUser = user && (user.id || user._id || user.email || Object.keys(user).length > 0);

        if (!hasUser || !token) {
            setLoading(false);
            setSettings(null);
            return;
        }

        async function loadSettings() {
            try {
                setLoading(true);
                console.log("[Settings] Loading...");
                const data = await SettingsService.getSettings();
                console.log("Settings response:", data);
                setSettings(data);
                console.log("[Settings] Loaded.");
            } catch (error) {
                console.error("[Settings] Failed to load.", error);
            } finally {
                setLoading(false);
            }
        }

        loadSettings();
    }, [user]);
    // =====================================================
    // Auto Save
    // =====================================================

    useEffect(() => {
        if (!settings) return;

        // 2. Prevent auto-save from immediately firing right after initial fetch
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        SettingsService.saveSettings(settings).catch((error) =>
            console.error("[Settings] Save failed.", error),
        );
    }, [settings]);

    // =====================================================
    // Generic Update
    // =====================================================

    const updateSetting = useCallback((path, value) => {
        setSettings((previous) => {
            if (!previous) return previous;

            const updated = structuredClone(previous);

            const keys = path.split(".");

            let current = updated;

            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }

            current[keys[keys.length - 1]] = value;

            return updated;
        });
    }, []);

    // =====================================================
    // Preferences
    // =====================================================

    const updatePreference = useCallback(
        (path, value) => {
            updateSetting(`preferences.${path}`, value);
        },
        [updateSetting],
    );

    // =====================================================
    // Module Defaults
    // =====================================================

    const updateModuleDefault = useCallback(
        (module, key, value) => {
            updateSetting(`moduleDefaults.${module}.${key}`, value);
        },
        [updateSetting],
    );

    // =====================================================
    // Themes
    // =====================================================

    const applyTheme = useCallback(
        (themeId) => {
            updateSetting("preferences.appearance.currentTheme", themeId);
        },
        [updateSetting],
    );

    const saveTheme = useCallback((theme) => {
        setSettings((previous) => ({
            ...previous,
            themes: [...previous.themes, theme],
        }));
    }, []);

    const updateTheme = useCallback((id, updates) => {
        setSettings((previous) => ({
            ...previous,
            themes: previous.themes.map((theme) =>
                theme.id === id ? { ...theme, ...updates } : theme,
            ),
        }));
    }, []);

    const deleteTheme = useCallback((id) => {
        setSettings((previous) => ({
            ...previous,
            themes: previous.themes.filter((theme) => theme.id !== id),
        }));
    }, []);

    // =====================================================
    // Locations
    // =====================================================

    const applyLocation = useCallback(
        (locationId) => {
            updateSetting("preferences.locationId", locationId);
        },
        [updateSetting],
    );

    const saveLocation = useCallback((location) => {
        setSettings((previous) => ({
            ...previous,
            locations: [...previous.locations, location],
        }));
    }, []);

    const updateLocation = useCallback((id, updates) => {
        setSettings((previous) => ({
            ...previous,
            locations: previous.locations.map((location) =>
                location.id === id ? { ...location, ...updates } : location,
            ),
        }));
    }, []);

    const deleteLocation = useCallback((id) => {
        setSettings((previous) => ({
            ...previous,

            locations: previous.locations.filter((location) => location.id !== id),

            preferences:
                previous.preferences.locationId === id
                    ? {
                          ...previous.preferences,

                          preferences: {
                              ...previous.preferences.preferences,
                              locationId: "default-location",
                          },
                      }
                    : previous.preferences,
        }));
    }, []);

    // =====================================================
    // Reset
    // =====================================================

    const resetToDefaults = useCallback(async () => {
        try {
            const defaults = await SettingsService.getSettings();

            setSettings(defaults);
        } catch (error) {
            console.error(error);
        }
    }, []);

    // =====================================================
    // Getter
    // =====================================================

    const getSetting = useCallback(
        (path) => {
            if (!settings) return undefined;

            return path.split(".").reduce((object, key) => object?.[key], settings);
        },
        [settings],
    );

    return {
        settings,
        loading,

        updateSetting,

        updatePreference,
        updateModuleDefault,

        applyTheme,

        saveTheme,
        updateTheme,
        deleteTheme,

        applyLocation,
        saveLocation,
        updateLocation,
        deleteLocation,

        resetToDefaults,

        getSetting,
    };
}

export function useSettings() {
    return useSettingsContext();
}
