import { useWeather } from "../../hooks/useWeather";
import {
    CurrentWeather,
    DailyWeather,
} from "../../services/utils/weatherCompile";
import "./weather.css";

import WeatherLocation from "./WeatherLocation";
import WeatherIcon from "./WeatherIcon";
import WeatherTemps from "./WeatherTemps";

export default function WeatherModule() {
    const { weather, loading, error } = useWeather();

    if (loading) return <p>Loading weather...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!weather) return <p>No weather data</p>;

    const cur = CurrentWeather(weather);
    const day = DailyWeather(weather);
    console.log("Current Weather Data: ", cur); //
    console.log("Daily Weather Data:", day);

    return (
        <div className="weather">
            <div className="weather__header">
                <WeatherLocation />
            </div>
            <div className="weather__body">
                <div className="weather__primary">
                    <WeatherIcon weatherCode={cur.weatherCode} />
                    <WeatherTemps
                        currentTemp={cur.temperature}
                        maxTemp={day.tempMax[0]}
                        minTemp={day.tempMin[0]}
                    />
                </div>
                <div className="weather__secondary"></div>
            </div>
        </div>
    );
}
