import { useCallback, useEffect, useMemo, useState } from "react";
import { useSettings } from "./useSettings";
import { useAuth } from "./useAuth";
import { useRealtime } from "../context/RealtimeContext";
import locationService from "../services/locationService";

export function useLocation({ live = true } = {}) {
    const { settings, loading: settingsLoading } = useSettings();
    const { user } = useAuth();
    const { subscribe } = useRealtime();

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const load = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await locationService.getAll();
            setLocations(Array.isArray(data) ? data : []);
        } catch (e) {
            setError(e.message || "Failed to load locations.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!user) {
            setLocations([]);
            setLoading(false);
            return;
        }
        load();
    }, [user, load]);

    useEffect(() => {
        if (!live || !user) return undefined;

        const url = locationService.streamUrl();

        const upsert = (e) => {
            const location = JSON.parse(e.data);
            setLocations((prev) => {
                const exists = prev.some((l) => l.id === location.id);
                return exists
                    ? prev.map((l) => (l.id === location.id ? location : l))
                    : [...prev, location];
            });
        };
        const remove = (e) => {
            const { id } = JSON.parse(e.data);
            setLocations((prev) => prev.filter((l) => l.id !== id));
        };

        const unsub1 = subscribe(url, "location-created", upsert);
        const unsub2 = subscribe(url, "location-updated", upsert);
        const unsub3 = subscribe(url, "location-removed", remove);

        return () => {
            unsub1();
            unsub2();
            unsub3();
        };
    }, [live, user, subscribe]);

    const currentLocation = useMemo(() => {
        if (!settings) return null;
        return locations.find((l) => l.id === settings.preferences.locationId) ?? null;
    }, [locations, settings]);

    const locationOptions = useMemo(
        () => locations.map((l) => ({ id: l.id, label: l.name })),
        [locations],
    );

    const requestCurrentLocation = useCallback(() => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error("Geolocation is not supported."));
                return;
            }
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => resolve({ latitude: coords.latitude, longitude: coords.longitude }),
                reject,
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
            );
        });
    }, []);

    const createLocation = useCallback(async (payload) => {
        const created = await locationService.create(payload);
        setLocations((prev) => {
            const exists = prev.some((l) => l.id === created.id);
            return exists
                ? prev.map((l) => (l.id === created.id ? created : l))
                : [...prev, created];
        });
        return created;
    }, []);

    const updateLocation = useCallback(async (id, updates) => {
        const updated = await locationService.update(id, updates);
        setLocations((prev) => prev.map((l) => (l.id === id ? updated : l)));
        return updated;
    }, []);

    const deleteLocation = useCallback(async (id) => {
        await locationService.remove(id);
        setLocations((prev) => prev.filter((l) => l.id !== id));
    }, []);

    return {
        loading: loading || settingsLoading,
        error,
        locations,
        currentLocation,
        locationOptions,
        requestCurrentLocation,
        createLocation,
        updateLocation,
        deleteLocation,
        reload: load,
    };
}
