import { useWeather } from "../../hooks/useWeather";
import WeatherLastUpdated from "./WeatherLastUpdated";
import WeatherLocation from "./WeatherLocation";

import {
    CurrentWeather,
    DailyWeather,
} from "../../services/utils/weatherCompile";

import {
    WeatherPrimaryIcon,
    WeatherPrimaryTemps,
    WeatherSecondaryStats,
} from "./WeatherStats";

import { getLocationName } from "../../services/api/geoCoding.js";

import "./weather.css";

export default function WeatherModule() {
    const { weather, loading, error } = useWeather();
    if (loading) return <p>Loading weather...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!weather) return <p>No weather data</p>;

    var lat = weather.latitude;
    var lon = weather.longitude;

    const CUR = CurrentWeather(weather);
    const DAY = DailyWeather(weather);

    const LOCATION_NAME = await getLocationName(lat, lon)
    console.log(LOCATION_NAME);
    
    const stats = {
        icon: {
            weatherCode: CUR.weatherCode,
            isDay: true,
            isAnimated: true,
            isFill: true,
        },
        temp: {
            curTemp: CUR.temperature,
            maxTemp: DAY.tempMax[0],
            minTemp: DAY.tempMin[0],
        },
        humidity: {
            type: "humidity",
            label: "Humidity",
            value: CUR.humidity,
            unit: "%",
        },
        wind: {
            type: "wind",
            label: "Wind",
            value: CUR.windSpeed,
            unit: "m/s",
        },
        precipitation: {
            type: "precipitation",
            label: "Precipitation",
            value: CUR.precipitation,
            unit: "mm/h",
        },
    };
    return (
        <div className="weather">
            <div className="weather__header">
                <WeatherLocation />
            </div>
            <div className="weather__body">
                <div className="weather__primary">
                    <WeatherPrimaryIcon {...stats.icon} />
                    <WeatherPrimaryTemps {...stats.temp} />
                </div>
                <div className="weather__secondary">
                    <WeatherSecondaryStats {...stats.humidity} />
                    <WeatherSecondaryStats {...stats.wind} />
                    <WeatherSecondaryStats {...stats.precipitation} />
                </div>
            </div>
            <div className="weather__footer">
                <WeatherLastUpdated time={CUR.time} />
            </div>
        </div>
    );
}
