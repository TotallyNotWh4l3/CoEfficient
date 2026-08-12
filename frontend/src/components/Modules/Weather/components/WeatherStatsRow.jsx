import React from "react";
import { Droplet, Wind, CloudRain } from "lucide-react";
import "../weather.css";

/**
 * Props:
 * - humidity: number (%)
 * - windSpeed: number (m/s)
 * - precipChance: number (%)
 * - isJapanese: boolean
 */
export default function WeatherStatsRow({ humidity, windSpeed, precipChance, isJapanese }) {
    return (
        <div className="weather-stats">
            <div className="weather-stats__item">
                <Droplet className="weather-stats__icon weather-stats__icon--humidity" />
                <div className="weather-stats__text">
                    <span className="weather-stats__label">{isJapanese ? "湿度" : "Humidity"}</span>
                    <span className="weather-stats__value">{humidity}%</span>
                </div>
            </div>

            <div className="weather-stats__item weather-stats__item--middle">
                <Wind className="weather-stats__icon weather-stats__icon--wind" />
                <div className="weather-stats__text">
                    <span className="weather-stats__label">{isJapanese ? "現在風速" : "Wind"}</span>
                    <span className="weather-stats__value">
                        {windSpeed} <span className="weather-stats__unit">m/s</span>
                    </span>
                </div>
            </div>

            <div className="weather-stats__item">
                <CloudRain className="weather-stats__icon weather-stats__icon--precip" />
                <div className="weather-stats__text">
                    <span className="weather-stats__label">
                        {isJapanese ? "降水確率" : "Precip"}
                    </span>
                    <span className="weather-stats__value">
                        {precipChance} <span className="weather-stats__unit">%</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
