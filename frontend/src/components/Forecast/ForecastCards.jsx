// ForecastCards.jsx
import "./forecast-card.css";

import {
    getWeatherIcon,
    CODE_MAP,
    getWeatherCodeBackground,
} from "../../services/utils/weatherConstants";

import WeatherIcon from "./../../assets/WeatherIcon";
import { DailyForecastCompiled } from "../../services/utils/weatherCompile";

export function ForecastDayCard({ data = null }) {
    let bgColor = getWeatherCodeBackground(data.weatherCode);

    let timeObject = new Date(data.timestamp * 1000);
    let month = timeObject.getMonth() + 1;
    let date = timeObject.getDate();
    let formattedDate = `${month}/${date}`;
    return (
        <div
            className="card card--forecast"
            style={{ "--wc-forecast-bg-gradient": bgColor }}
        >
            <div className="card__header">
                <p> {formattedDate} </p>
            </div>

            <div className="card__body">
                <WeatherIcon
                    className="forecast__icon"
                    weatherCode={data.weatherCode}
                />
            </div>

            <div className="card__footer">
                <p className="forecast__temps">
                    <span className="forecast__temp forecast__temp--max">
                        {data.tempMax}
                    </span>
                    <span className="forecast__temp forecast__temp--unit">
                        °
                    </span>
                    <span> / </span>
                    <span className="forecast__temp forecast__temp--min">
                        {data.tempMin}
                    </span>
                    <span className="forecast__temp forecast__temp--unit">
                        °
                    </span>
                </p>
            </div>
        </div>
    );
}
