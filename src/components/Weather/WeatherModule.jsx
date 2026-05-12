import { useWeather } from "../../hooks/useWeather";
import { CurrentWeather } from "../../services/utils/weatherCompile";
import "./weather-module.css";

import WeatherIconModule from "./WeatherIconModule";
import WeatherLocationModule from "./WeatherLocationModule";

export default function WeatherModule() {
    const { weather, loading, error } = useWeather();

    if (loading) return <p>Loading weather...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!weather) return <p>No weather data</p>;

    const current = CurrentWeather(weather);
    console.warn("Current Weather Data: ", current); //

    return (
        <div className="weather-module">
            <div className="weather-module__header">
                <WeatherLocationModule />
            </div>
            <div className="weather-module__body">
                <div className="weather-module__primary">
                    <WeatherIconModule icon={current.icon} />
                </div>
            </div>
            <div className="weather-module__footer"></div>
        </div>
    );
}
