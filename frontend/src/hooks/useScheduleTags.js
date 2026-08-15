// frontend/src/hooks/useScheduleTags.js
import { useState, useEffect, useCallback, useRef } from "react";
import scheduleService from "../services/scheduleService";

export default function useScheduleTags({ live = true } = {}) {
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const streamRef = useRef(null);

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

    // Real-time sync: tag creates/updates/deletes reuse the same schedule SSE stream.
    useEffect(() => {
        if (!live) return undefined;

        const source = scheduleService.openStream();
        streamRef.current = source;

        const upsert = (tag) => {
            setTags((prev) => {
                const exists = prev.some((t) => t.id === tag.id);
                return exists ? prev.map((t) => (t.id === tag.id ? tag : t)) : [...prev, tag];
            });
        };

        const remove = (payload) => {
            setTags((prev) => prev.filter((t) => t.id !== payload.id));
        };

        source.addEventListener("tag-updated", (e) => upsert(JSON.parse(e.data)));
        source.addEventListener("tag-removed", (e) => remove(JSON.parse(e.data)));

        return () => source.close();
    }, [live]);

    const upsertTag = useCallback(async (id, color) => {
        const tag = await scheduleService.upsertTag(id, color);
        setTags((prev) => {
            const exists = prev.some((t) => t.id === tag.id);
            // The SSE 'tag-updated' event may have already applied this — avoid a duplicate.
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
