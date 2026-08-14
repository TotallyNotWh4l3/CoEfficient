import { useCallback, useEffect, useMemo, useState } from "react";
import { useSettings } from "./useSettings";
import { useAuth } from "./useAuth";
import locationService from "../services/locationService";

/**
 * Locations are a single shared list (everyone reads the same set; only
 * admin/manager can write) rather than something stored per-user, so this
 * hook now owns its own fetch/state instead of reading settings.locations.
 * settings.preferences.locationId (this user's personally selected default)
 * is unaffected — it still just points at one of the shared location ids.
 */
export function useLocation() {
    const { settings, loading: settingsLoading } = useSettings();
    const { user } = useAuth();

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

    // Only fetch once actually logged in — DialogManager mounts unconditionally
    // (even on the Login screen, see App.jsx), so without this guard every
    // page load fires an unauthenticated GET /api/locations and logs a 401.
    useEffect(() => {
        if (!user) {
            setLocations([]);
            setLoading(false);
            return;
        }
        load();
    }, [user, load]);

    const currentLocation = useMemo(() => {
        if (!settings) return null;
        return (
            locations.find((location) => location.id === settings.preferences.locationId) ?? null
        );
    }, [locations, settings]);

    const locationOptions = useMemo(
        () =>
            locations.map((location) => ({
                id: location.id,
                label: location.name,
            })),
        [locations],
    );

    const requestCurrentLocation = useCallback(() => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error("Geolocation is not supported."));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                    });
                },
                reject,
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000,
                },
            );
        });
    }, []);

    // ---------------------------------------------------------------
    // Write operations — backend rejects these with 403 for non
    // manager/admin users, so gate the UI that calls these too.
    // ---------------------------------------------------------------

    const createLocation = useCallback(async (payload) => {
        const created = await locationService.create(payload);
        setLocations((prev) => [...prev, created]);
        return created;
    }, []);

    const updateLocation = useCallback(async (id, updates) => {
        const updated = await locationService.update(id, updates);
        setLocations((prev) => prev.map((location) => (location.id === id ? updated : location)));
        return updated;
    }, []);

    const deleteLocation = useCallback(async (id) => {
        await locationService.remove(id);
        setLocations((prev) => prev.filter((location) => location.id !== id));
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
