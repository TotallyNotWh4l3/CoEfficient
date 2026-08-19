import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useRealtime } from "../context/RealtimeContext";
import themeService from "../services/themeService";

export function useThemes({ live = true } = {}) {
    const { user } = useAuth();
    const { subscribe } = useRealtime();

    const [themes, setThemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const load = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await themeService.getAll();
            setThemes(Array.isArray(data) ? data : []);
        } catch (e) {
            setError(e.message || "Failed to load themes.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!user) {
            setThemes([]);
            setLoading(false);
            return;
        }
        load();
    }, [user, load]);

    useEffect(() => {
        if (!live || !user) return undefined;

        const url = themeService.streamUrl();

        const upsert = (e) => {
            const theme = JSON.parse(e.data);
            setThemes((prev) => {
                const exists = prev.some((t) => t.id === theme.id);
                return exists ? prev.map((t) => (t.id === theme.id ? theme : t)) : [...prev, theme];
            });
        };
        const remove = (e) => {
            const { id } = JSON.parse(e.data);
            setThemes((prev) => prev.filter((t) => t.id !== id));
        };

        const unsub1 = subscribe(url, "theme-created", upsert);
        const unsub2 = subscribe(url, "theme-updated", upsert);
        const unsub3 = subscribe(url, "theme-removed", remove);

        return () => {
            unsub1();
            unsub2();
            unsub3();
        };
    }, [live, user, subscribe]);

    const createTheme = useCallback(async (payload) => {
        const created = await themeService.create(payload);
        setThemes((prev) => {
            const exists = prev.some((t) => t.id === created.id);
            return exists
                ? prev.map((t) => (t.id === created.id ? created : t))
                : [...prev, created];
        });
        return created;
    }, []);

    const updateTheme = useCallback(async (id, updates) => {
        const updated = await themeService.update(id, updates);
        setThemes((prev) => prev.map((t) => (t.id === id ? updated : t)));
        return updated;
    }, []);

    const deleteTheme = useCallback(async (id) => {
        await themeService.remove(id);
        setThemes((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return { themes, loading, error, reload: load, createTheme, updateTheme, deleteTheme };
}
