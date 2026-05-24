import { useWeather } from "../../hooks/useWeather";
import {
    CurrentWeather,
    DailyWeather,
} from "../../services/utils/weatherCompile";
import "./weather.css";

import WeatherLocation from "./WeatherLocation";
import {
    WeatherPrimaryIcon,
    WeatherPrimaryTemps,
    WeatherSecondaryStats,
} from "./WeatherStats";

export default function WeatherModule() {
    const { weather, loading, error } = useWeather();
    if (loading) return <p>Loading weather...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!weather) return <p>No weather data</p>;

    const cur = CurrentWeather(weather);
    console.log(cur)
    const day = DailyWeather(weather);

    console.error(weather);

    const stats = {
        icon: {
            weatherCode: cur.weatherCode,
            isDay: true,
            isAnimated: true,
            isFill: true,
        },
        temp: {
            curTemp: cur.temperature,
            maxTemp: day.tempMax[0],
            minTemp: day.tempMin[0]
        },
        humidity: {
            type: "humidity",
            label: "Humidity",
            value: cur.humidity,
            unit: "%",
        },
        wind: {
            type: "wind",
            label: "Wind",
            value: cur.windSpeed,
            unit: "m/s",
        },
    };

    return (
        <div className="weather">
            <div className="weather__header">
                <WeatherLocation />
            </div>
            <div className="weather__body">
                <div className="weather__primary">
                    <WeatherPrimaryIcon {...stats.icon}/>
                    <WeatherPrimaryTemps {...stats.temp}/>
                </div>
                <div className="weather__secondary">
                    <WeatherSecondaryStats {...stats.humidity}/>
                    <WeatherSecondaryStats {...stats.wind}/>
                    <WeatherSecondaryStats />
                    <WeatherIcon weatherCode={current.weatherCode} />
                    <WeatherTemps currentTemp={current.temperature} />
                </div>
                <div className="weather__secondary"></div>
            </div>
            <div className="weather__footer">
                <p>Last Updated:    </p>
            </div>
        </div>
    );
}
