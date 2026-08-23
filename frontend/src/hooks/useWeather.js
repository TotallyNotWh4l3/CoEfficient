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

        const scheduleNextSync = () => {
            const now = new Date();
            const minutes = now.getMinutes();
            const offsetMinutes = [1, 16, 31, 46];

            const next = offsetMinutes.find((m) => m > minutes) ?? offsetMinutes[0] + 60;
            const nextSync = new Date(now);
            nextSync.setMinutes(next % 60, 0, 0);
            if (next >= 60) nextSync.setHours(nextSync.getHours() + 1);

            const delay = nextSync.getTime() - now.getTime();

            return setTimeout(() => {
                loadWeather();
                scheduleNextSync(); // reschedule for the following slot
            }, delay);
        };

        const timer = scheduleNextSync();
        return () => clearTimeout(timer);
    }, [loadWeather]);

    return {
        weather,
        loading,
        error,
        refresh: loadWeather,
    };
}
