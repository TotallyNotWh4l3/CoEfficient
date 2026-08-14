// frontend/src/hooks/useSchedule.js
import { useState, useEffect, useCallback, useRef } from "react";
import scheduleService from "../services/scheduleService";

/**
 * @param {object} options
 * @param {'all'|'today'|'upcoming'} options.scope - which slice to load
 * @param {number} options.limit - only used when scope === 'upcoming'
 * @param {boolean} options.live - subscribe to the SSE stream for real-time sync
 */
export default function useSchedule({ scope = "all", limit = undefined, live = true } = {}) {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const streamRef = useRef(null);

    const load = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            let data;
            if (scope === "today") {
                data = await scheduleService.getToday();
            } else if (scope === "upcoming") {
                data = await scheduleService.getUpcoming(limit);
            } else {
                data = await scheduleService.getAll();
            }
            setEvents(Array.isArray(data) ? data : []);
            if (!Array.isArray(data)) {
                console.warn("[useSchedule] Expected an array, got:", data);
            }
        } catch (e) {
            setError(e.message || "Failed to load schedule.");
        } finally {
            setIsLoading(false);
        }
    }, [scope, limit]);

    useEffect(() => {
        load();
    }, [load]);

    // Sort helper: by date then time, ascending (soonest first).
    const sortEvents = useCallback(
        (list) =>
            [...list].sort((a, b) => {
                const aKey = `${a.eventDate}T${a.eventTime}`;
                const bKey = `${b.eventDate}T${b.eventTime}`;
                return aKey.localeCompare(bKey);
            }),
        [],
    );

    // Real-time sync: merge pushed events into local state instead of refetching everything.
    useEffect(() => {
        if (!live) return undefined;

        const source = scheduleService.openStream();
        streamRef.current = source;

        const todayIso = () => new Date().toISOString().slice(0, 10);

        const belongsInScope = (item) => {
            if (scope === "today") return item.eventDate === todayIso();
            if (scope === "upcoming") return item.eventDate >= todayIso();
            return true;
        };

        const upsert = (item) => {
            setEvents((prev) => {
                const list = Array.isArray(prev) ? prev : [];
                const exists = list.some((e) => e.id === item.id);

                if (item.isDeleted || !belongsInScope(item)) {
                    return list.filter((e) => e.id !== item.id);
                }

                const next = exists
                    ? list.map((e) => (e.id === item.id ? item : e))
                    : [item, ...list];

                const sorted = sortEvents(next);
                return scope === "upcoming" && limit ? sorted.slice(0, limit) : sorted;
            });
        };

        const remove = (item) => {
            setEvents((prev) => (Array.isArray(prev) ? prev.filter((e) => e.id !== item.id) : []));
        };

        source.addEventListener("created", (e) => upsert(JSON.parse(e.data)));
        source.addEventListener("updated", (e) => upsert(JSON.parse(e.data)));
        source.addEventListener("deleted", (e) => remove(JSON.parse(e.data)));

        return () => source.close();
    }, [live, scope, limit, sortEvents]);

    const createEvent = useCallback(
        async (payload) => {
            const created = await scheduleService.create(payload);
            setEvents((prev) => {
                const list = Array.isArray(prev) ? prev : [];
                // The SSE 'created' event may have already added this via upsert() —
                // don't add it a second time.
                if (list.some((e) => e.id === created.id)) return list;
                return sortEvents([created, ...list]);
            });
            return created;
        },
        [sortEvents],
    );

    const updateEvent = useCallback(
        async (id, payload) => {
            const updated = await scheduleService.update(id, payload);
            setEvents((prev) =>
                sortEvents(
                    (Array.isArray(prev) ? prev : []).map((e) => (e.id === id ? updated : e)),
                ),
            );
            return updated;
        },
        [sortEvents],
    );

    const deleteEvent = useCallback(async (id) => {
        await scheduleService.remove(id);
        setEvents((prev) => prev.filter((e) => e.id !== id));
    }, []);

    return {
        events,
        isLoading,
        error,
        reload: load,
        createEvent,
        updateEvent,
        deleteEvent,
    };
}
