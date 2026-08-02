import { useCallback, useMemo } from "react";
import { useSettings } from "./useSettings";

export function useLocation() {
    const { settings, loading } = useSettings();

    const locations = useMemo(() => settings?.locations ?? [], [settings]);

    const currentLocation = useMemo(() => {
        if (!settings) return null;

        return locations.find((location) => location.id === settings.preferences.locationId);
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

    return {
        loading,

        locations,
        currentLocation,
        locationOptions,

        requestCurrentLocation,
    };
}
