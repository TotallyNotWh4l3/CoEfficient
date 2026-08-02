import React from "react";
import { WeatherVisualIcon, getWeatherDescText } from "../utils/weatherHelpers.jsx";
import "../weather.css";

/**
 * Props:
 * - weatherCode: number (WMO code)
 * - isDay: 0 | 1
 * - temp: number
 * - highTemp: number
 * - lowTemp: number
 * - isJapanese: boolean
 */
export default function WeatherCurrentSummary({
    weatherCode,
    isDay,
    temp,
    highTemp,
    lowTemp,
    isJapanese,
}) {
    return (
        <div className="weather-summary">
            <div className="weather-summary__left">
                <WeatherVisualIcon
                    code={weatherCode}
                    isDay={isDay}
                    className="weather-summary__icon"
                />
                <div className="weather-summary__text">
                    <span className="weather-summary__condition">
                        {getWeatherDescText(weatherCode, isJapanese)}
                    </span>
                    <span className="weather-summary__code">WMO CODE: {weatherCode}</span>
                </div>
            </div>

            <div className="weather-summary__right">
                <div className="weather-summary__temp-row">
                    <span className="weather-summary__temp-value">{Math.round(temp)}</span>
                    <span className="weather-summary__temp-unit">°C</span>
                </div>
                <span className="weather-summary__hilo">
                    H: {highTemp}°C &nbsp; L: {lowTemp}°C
                </span>
            </div>
        </div>
    );
}
