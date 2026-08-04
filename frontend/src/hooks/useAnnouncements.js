// frontend/src/hooks/useAnnouncements.js
import { useState, useEffect, useCallback, useRef } from "react";
import announcementService from "../services/announcementService";

/**
 * @param {object} options
 * @param {boolean} options.recentOnly - true = dashboard card (last 5), false = full list
 * @param {boolean} options.live - subscribe to the SSE stream for real-time sync
 */
export default function useAnnouncements({ recentOnly = true, live = true } = {}) {
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const streamRef = useRef(null);

    const load = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = recentOnly
                ? await announcementService.getRecent()
                : await announcementService.getAll();
            setAnnouncements(data);
        } catch (e) {
            setError(e.message || "Failed to load announcements.");
        } finally {
            setIsLoading(false);
        }
    }, [recentOnly]);

    useEffect(() => {
        load();
    }, [load]);

    // Real-time sync: merge pushed events into local state instead of refetching everything.
    useEffect(() => {
        if (!live) return undefined;

        const source = announcementService.openStream();
        streamRef.current = source;

        const upsert = (item) => {
            setAnnouncements((prev) => {
                const exists = prev.some((a) => a.id === item.id);
                const next = exists
                    ? prev.map((a) => (a.id === item.id ? item : a))
                    : [item, ...prev];
                return next
                    .filter((a) => !a.isDeleted && !a.isArchived)
                    .sort((a, b) => {
                        if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    })
                    .slice(0, recentOnly ? 5 : undefined);
            });
        };

        const remove = (item) => {
            setAnnouncements((prev) => prev.filter((a) => a.id !== item.id));
        };

        source.addEventListener("created", (e) => upsert(JSON.parse(e.data)));
        source.addEventListener("updated", (e) => upsert(JSON.parse(e.data)));
        source.addEventListener("restored", (e) => upsert(JSON.parse(e.data)));
        source.addEventListener("deleted", (e) => remove(JSON.parse(e.data)));
        source.addEventListener("archived", (e) => remove(JSON.parse(e.data)));

        return () => source.close();
    }, [live, recentOnly]);

    const createAnnouncement = useCallback(async (payload) => {
        const created = await announcementService.create(payload);
        setAnnouncements((prev) => [created, ...prev]);
        return created;
    }, []);

    const updateAnnouncement = useCallback(async (id, payload) => {
        const updated = await announcementService.update(id, payload);
        setAnnouncements((prev) => prev.map((a) => (a.id === id ? updated : a)));
        return updated;
    }, []);

    const deleteAnnouncement = useCallback(async (id) => {
        await announcementService.remove(id);
        setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    }, []);

    return {
        announcements,
        isLoading,
        error,
        reload: load,
        createAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
    };
}
