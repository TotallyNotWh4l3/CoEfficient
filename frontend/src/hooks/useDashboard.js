import { useState, useEffect, useCallback } from "react";
import { useDashboardContext } from "../context/DashboardContext";
import { useRealtime } from "../context/RealtimeContext";
import dashboardService from "../services/dashboardService";

const EMPTY_DASHBOARD = {
    id: "main",
    name: "Main Dashboard",
    layout: { columns: 3, gap: 16, padding: 16 },
    modules: [],
};

/**
 * useDashboard Hook
 *
 * Each user's dashboard now lives server-side (not localStorage), so it
 * follows them across devices/browsers, and stays live-synced between
 * their own open tabs/devices via SSE (routed through RealtimeContext,
 * same as every other live-synced hook). Takes `user` as a parameter (same
 * convention as useSettingsState(user)) since this is called before
 * AuthProvider wraps the tree in App.jsx.
 */
export function useDashboardState(user) {
    const userId = user?.id ?? user?._id ?? null;
    const [dashboard, setDashboard] = useState(EMPTY_DASHBOARD);
    const [loading, setLoading] = useState(true);
    const [selectedModuleId, setSelectedModuleId] = useState(null);
    const { subscribe } = useRealtime();

    // =====================================================
    // Load (and reload whenever the logged-in user changes)
    // =====================================================
    useEffect(() => {
        if (!userId) {
            setDashboard(EMPTY_DASHBOARD);
            setLoading(false);
            return;
        }
        let cancelled = false;
        setLoading(true);
        dashboardService
            .getState()
            .then((state) => {
                if (!cancelled) setDashboard(state);
            })
            .catch((e) => {
                console.error("[useDashboard] Failed to load dashboard:", e);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        setSelectedModuleId(null);
        return () => {
            cancelled = true;
        };
    }, [userId]);

    // =====================================================
    // Live sync (SSE via RealtimeContext) — resubscribes
    // whenever the user changes
    // =====================================================
    useEffect(() => {
        if (!userId) return undefined;

        const url = dashboardService.streamUrl();

        const unsubLayout = subscribe(url, "layout-updated", (e) => {
            const layout = JSON.parse(e.data);
            setDashboard((prev) => ({ ...prev, layout }));
        });

        const unsubAdded = subscribe(url, "module-added", (e) => {
            const module = JSON.parse(e.data);
            setDashboard((prev) => {
                if (prev.modules.some((m) => m.id === module.id)) return prev; // dedupe vs. our own optimistic add
                return { ...prev, modules: [...prev.modules, module] };
            });
        });

        const unsubUpdated = subscribe(url, "module-updated", (e) => {
            const module = JSON.parse(e.data);
            setDashboard((prev) => ({
                ...prev,
                modules: prev.modules.map((m) => (m.id === module.id ? module : m)),
            }));
        });

        const unsubRemoved = subscribe(url, "module-removed", (e) => {
            const { id } = JSON.parse(e.data);
            setDashboard((prev) => ({
                ...prev,
                modules: prev.modules.filter((m) => m.id !== id),
            }));
        });

        return () => {
            unsubLayout();
            unsubAdded();
            unsubUpdated();
            unsubRemoved();
        };
    }, [userId, subscribe]);

    // =====================================================
    // Layout
    // =====================================================
    const updateLayout = useCallback(async (key, value) => {
        setDashboard((prev) => ({ ...prev, layout: { ...prev.layout, [key]: value } }));
        try {
            await dashboardService.updateLayout({ [key]: value });
        } catch (e) {
            console.error("[useDashboard] Failed to update layout:", e);
        }
    }, []);

    // =====================================================
    // Local-only override — does NOT persist to the server.
    // Kept for API-compatibility with existing call sites.
    // =====================================================
    const updateDashboard = useCallback((updater) => {
        setDashboard((prev) => (typeof updater === "function" ? updater(prev) : updater));
    }, []);

    // =====================================================
    // Modules
    // =====================================================
    const addModule = useCallback(async (type, settings = {}) => {
        try {
            const module = await dashboardService.addModule(type, settings);
            setDashboard((prev) => {
                if (prev.modules.some((m) => m.id === module.id)) return prev;
                return { ...prev, modules: [...prev.modules, module] };
            });
            return module;
        } catch (e) {
            console.error("[useDashboard] Failed to add module:", e);
            throw e;
        }
    }, []);

    const removeModule = useCallback(async (moduleId) => {
        setDashboard((prev) => ({
            ...prev,
            modules: prev.modules.filter((module) => module.id !== moduleId),
        }));
        try {
            await dashboardService.removeModule(moduleId);
        } catch (e) {
            console.error("[useDashboard] Failed to remove module:", e);
        }
    }, []);

    const updateModuleSettings = useCallback(async (moduleId, key, value) => {
        setDashboard((prev) => ({
            ...prev,
            modules: prev.modules.map((module) =>
                module.id === moduleId
                    ? { ...module, settings: { ...module.settings, [key]: value } }
                    : module,
            ),
        }));
        try {
            await dashboardService.updateModuleSettings(moduleId, key, value);
        } catch (e) {
            console.error("[useDashboard] Failed to update module settings:", e);
        }
    }, []);

    const selectModule = useCallback((moduleId) => {
        setSelectedModuleId(moduleId);
    }, []);

    return {
        dashboard,
        loading,
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
