import { useWeather } from "../../hooks/useWeather";
import WeatherLastUpdated from "./WeatherLastUpdated";
import WeatherLocation from "./WeatherLocation";

import {
    CurrentWeather,
    DailyWeather,
} from "../../services/utils/weatherCompile";


import {
    WeatherPrimaryTemps,
    WeatherSecondaryStats,
} from "./WeatherStats";

import "./weather.css";
import WeatherIcon from './../../assets/WeatherIcon';
import {
    getWeatherCodeBackground,
    getWeatherCodeTextColor,
} from "../../services/utils/weatherConstants";

export default function Weather() {
    const { weather, loading, error } = useWeather();

    if (loading) return <p>Loading weather...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!weather) return <p>No weather data</p>;

    const CUR = CurrentWeather(weather);
    const DAY = DailyWeather(weather);

    var background = getWeatherCodeBackground(CUR.weatherCode, CUR.isDay);
    var textColor = getWeatherCodeTextColor(CUR.weatherCode, CUR.isDay);
    console.log(background, textColor);

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
        <div
            className="weather module"
            style={{
                "--wc-background-gradient": background,
                "--wc-text-color-main": textColor.main,
                "--wc-text-color-sub1": textColor.sub1,
                "--wc-text-color-sub2": textColor.sub2,
                "--wc-text-color-sub3": textColor.sub3,
            }}
        >
            <div className="weather__header">
                <WeatherLocation pinColor={textColor.sub1}/>
            </div>
            <div className="weather__body">
                <div className="weather__primary">
                    <WeatherIcon className="weather__icon" {...stats.icon} />
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
