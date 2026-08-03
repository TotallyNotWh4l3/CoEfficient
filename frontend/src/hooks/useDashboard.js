import { useState, useEffect, useCallback } from "react";
import { useDashboardContext } from "../context/DashboardContext";
import { DEFAULT_DASHBOARD } from "../../../shared/constants/defaults/defaultDashboard.js"
/**
 * useDashboard Hook
 * Manages the current dashboard with localStorage persistence.
 */
export function useDashboardState() {
    const [dashboard, setDashboard] = useState(() => {
        try {
            const stored = localStorage.getItem("co-efficient-dashboard");

            if (!stored) {
                return structuredClone(DEFAULT_DASHBOARD);
            }

            const parsed = JSON.parse(stored);

            return {
                ...structuredClone(DEFAULT_DASHBOARD),
                ...parsed,

                layout: {
                    ...DEFAULT_DASHBOARD.layout,
                    ...parsed.layout,
                },

                modules: parsed.modules ?? DEFAULT_DASHBOARD.modules,
            };
        } catch (e) {
            console.error("Failed to load dashboard:", e);
            return structuredClone(DEFAULT_DASHBOARD);
        }
    });
    const [selectedModuleId, setSelectedModuleId] = useState(null);
    useEffect(() => {
        try {
            localStorage.setItem("co-efficient-dashboard", JSON.stringify(dashboard));
        } catch (e) {
            console.error("Failed to save dashboard:", e);
        }
    }, [dashboard]);

    // =====================================================
    // Layout
    // =====================================================

    const updateLayout = useCallback((key, value) => {
        setDashboard((prev) => ({
            ...prev,
            layout: {
                ...prev.layout,
                [key]: value,
            },
        }));
    }, []);

    // =====================================================
    // Dashboard
    // =====================================================

    const updateDashboard = useCallback((updater) => {
        setDashboard((prev) => (typeof updater === "function" ? updater(prev) : updater));
    }, []);

    const addModule = useCallback((type, settings = {}) => {
        setDashboard((prev) => ({
            ...prev,
            modules: [
                ...prev.modules,
                {
                    id: crypto.randomUUID(),
                    type,
                    settings,
                    layout: {
                        w: 1,
                        h: 1,
                    },
                },
            ],
        }));
    }, []);

    const removeModule = useCallback((moduleId) => {
        setDashboard((prev) => ({
            ...prev,
            modules: prev.modules.filter((module) => module.id !== moduleId),
        }));
    }, []);

    const updateModuleSettings = useCallback((moduleId, key, value) => {
        setDashboard((prev) => ({
            ...prev,
            modules: prev.modules.map((module) =>
                module.id === moduleId
                    ? {
                          ...module,
                          settings: {
                              ...module.settings,
                              [key]: value,
                          },
                      }
                    : module,
            ),
        }));
    }, []);

    const selectModule = useCallback((moduleId) => {
        setSelectedModuleId(moduleId);
    }, []);

    return {
        dashboard,

        updateLayout,
        updateDashboard,

        addModule,
        removeModule,
        updateModuleSettings,

        selectedModuleId,
        selectModule,

        setDashboard,
    };
}

export function useDashboard() {
    return useDashboardContext();
}
