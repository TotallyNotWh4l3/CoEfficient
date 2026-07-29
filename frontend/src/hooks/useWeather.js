import { useCallback, useEffect, useState } from "react";
import { getWeather } from "../services/weatherApi";

export default function useWeather() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadWeather = useCallback(async () => {
        try {
            setLoading(true);

            const data = await getWeather();

            setWeather(data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

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
