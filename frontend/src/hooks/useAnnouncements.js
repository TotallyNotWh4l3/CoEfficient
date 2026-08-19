import { useState, useEffect, useCallback } from "react";
import { useRealtime } from "../context/RealtimeContext";
import announcementService from "../services/announcementService";

export default function useAnnouncements({ recentOnly = true, live = true } = {}) {
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { subscribe } = useRealtime();

    const load = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = recentOnly
                ? await announcementService.getRecent()
                : await announcementService.getAll();
            setAnnouncements(Array.isArray(data) ? data : []);
            if (!Array.isArray(data)) {
                console.warn("[useAnnouncements] Expected an array, got:", data);
            }
        } catch (e) {
            setError(e.message || "Failed to load announcements.");
        } finally {
            setIsLoading(false);
        }
    }, [recentOnly]);

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        if (!live) return undefined;

        const url = announcementService.streamUrl();

        const upsert = (item) => {
            setAnnouncements((prev) => {
                const list = Array.isArray(prev) ? prev : [];
                const exists = list.some((a) => a.id === item.id);
                const next = exists
                    ? list.map((a) => (a.id === item.id ? item : a))
                    : [item, ...list];
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
            setAnnouncements((prev) =>
                Array.isArray(prev) ? prev.filter((a) => a.id !== item.id) : [],
            );
        };

        const unsub1 = subscribe(url, "created", (e) => upsert(JSON.parse(e.data)));
        const unsub2 = subscribe(url, "updated", (e) => upsert(JSON.parse(e.data)));
        const unsub3 = subscribe(url, "restored", (e) => upsert(JSON.parse(e.data)));
        const unsub4 = subscribe(url, "deleted", (e) => remove(JSON.parse(e.data)));
        const unsub5 = subscribe(url, "archived", (e) => remove(JSON.parse(e.data)));

        return () => {
            unsub1();
            unsub2();
            unsub3();
            unsub4();
            unsub5();
        };
    }, [live, recentOnly, subscribe]);

    const createAnnouncement = useCallback(async (payload) => {
        const created = await announcementService.create(payload);
        setAnnouncements((prev) => {
            const list = Array.isArray(prev) ? prev : [];
            if (list.some((a) => a.id === created.id)) return list;
            return [created, ...list];
        });
        return created;
    }, []);

    const updateAnnouncement = useCallback(async (id, payload) => {
        const updated = await announcementService.update(id, payload);
        setAnnouncements((prev) =>
            (Array.isArray(prev) ? prev : []).map((a) => (a.id === id ? updated : a)),
        );
        return updated;
    }, []);

    const deleteAnnouncement = useCallback(async (id) => {
        await announcementService.remove(id);
        setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    }, []);

    const markAsRead = useCallback(async (id) => {
        setAnnouncements((prev) =>
            (Array.isArray(prev) ? prev : []).map((a) =>
                a.id === id ? { ...a, isRead: true } : a,
            ),
        );
        try {
            await announcementService.markRead(id);
        } catch (e) {
            console.error("[useAnnouncements] Failed to mark as read:", e);
        }
    }, []);

    const unreadCount = (Array.isArray(announcements) ? announcements : []).filter(
        (a) => !a.isRead,
    ).length;

    return {
        announcements,
        isLoading,
        error,
        reload: load,
        createAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        markAsRead,
        unreadCount,
    };
}
