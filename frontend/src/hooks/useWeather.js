// useWeather.js
import { useState, useEffect } from "react";
import { fetchWeatherData } from "../services/api/openMeteo.js";

export function useWeather() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function refresh(force = false) {
        try {
            setLoading(true);
            setError(null);

            const data = await fetchWeatherData(force);
            setWeather(data);
        } catch (err) {
            setError(err.message);
            console.error("[WEATHER HOOK]: Error:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // Fetch immediately on mount
        refresh(false);

        // Calculate time until next sync minute (1, 16, 31, 46)
        function scheduleNextUpdate() {
            const now = new Date();
            const currentMinute = now.getMinutes();
            const currentSeconds = now.getSeconds();
            const nextMinutes = [1, 16, 31, 46];

            let nextMinute = nextMinutes.find((m) => m > currentMinute);
            if (!nextMinute) {
                nextMinute = nextMinutes[0]; // Wrap to first minute of next hour
            }

            const minutesToWait =
                nextMinute > currentMinute
                    ? nextMinute - currentMinute
                    : 60 - currentMinute + nextMinute;
            const secondsToWait = 60 - currentSeconds;
            const timeUntilNextUpdate =
                (minutesToWait * 60 + secondsToWait) * 1000;

            console.log(
                `[WEATHER HOOK]: Next update in ${minutesToWait}m${secondsToWait}s at XX:${String(nextMinute).padStart(2, "0")}`,
            );

            const timeout = setTimeout(() => {
                console.log(
                    "[WEATHER HOOK]: Sync time reached. Force refreshing...",
                );
                refresh(true);

                // After first sync, set interval for every 15 minutes
                const interval = setInterval(
                    () => {
                        console.log(
                            "[WEATHER HOOK]: 15-minute sync triggered. Force refreshing...",
                        );
                        refresh(true);
                    },
                    15 * 60 * 1000,
                );

                return () => clearInterval(interval);
            }, timeUntilNextUpdate);

            return timeout;
        }

        const timeout = scheduleNextUpdate();
        return () => clearTimeout(timeout);
    }, []);

    return { weather, loading, error, refresh };
}
