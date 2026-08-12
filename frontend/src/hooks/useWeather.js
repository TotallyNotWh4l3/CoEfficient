import { useCallback, useEffect, useState } from "react";
import { getWeather } from "../services/weatherApi";

/**
 * @param {string} [locationId] — when provided, fetches weather for that
 * location specifically. When omitted, the backend falls back to the
 * user's saved preference (original behavior, unchanged).
 */
export default function useWeather(locationId) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadWeather = useCallback(async () => {
        try {
            setLoading(true);

            const data = await getWeather(locationId);

            setWeather(data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [locationId]);

    useEffect(() => {
        loadWeather();
    }, [loadWeather]);

    return {
        weather,
        loading,
        error,
        refresh: loadWeather,
    };
}
