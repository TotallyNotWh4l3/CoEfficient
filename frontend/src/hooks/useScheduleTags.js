import { useCallback, useEffect, useState } from "react";
import { useRealtime } from "../context/RealtimeContext";
import scheduleService from "../services/scheduleService";

export default function useScheduleTags({ live = true } = {}) {
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { subscribe } = useRealtime();

    const load = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await scheduleService.getTags();
            setTags(Array.isArray(data) ? data : []);
        } catch (e) {
            setError(e.message || "Failed to load tags.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        if (!live) return undefined;

        const url = scheduleService.streamUrl();

        const upsert = (e) => {
            const tag = JSON.parse(e.data);
            setTags((prev) => {
                const exists = prev.some((t) => t.id === tag.id);
                return exists ? prev.map((t) => (t.id === tag.id ? tag : t)) : [...prev, tag];
            });
        };
        const remove = (e) => {
            const payload = JSON.parse(e.data);
            setTags((prev) => prev.filter((t) => t.id !== payload.id));
        };

        const unsub1 = subscribe(url, "tag-updated", upsert);
        const unsub2 = subscribe(url, "tag-removed", remove);

        return () => {
            unsub1();
            unsub2();
        };
    }, [live, subscribe]);

    const upsertTag = useCallback(async (id, color) => {
        const tag = await scheduleService.upsertTag(id, color);
        setTags((prev) => {
            const exists = prev.some((t) => t.id === tag.id);
            return exists ? prev.map((t) => (t.id === tag.id ? tag : t)) : [...prev, tag];
        });
        return tag;
    }, []);

    const removeTag = useCallback(async (id) => {
        await scheduleService.removeTag(id);
        setTags((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return { tags, isLoading, error, reload: load, upsertTag, removeTag };
}
