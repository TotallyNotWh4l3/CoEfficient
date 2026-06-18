// ForecastCards.jsx
import "./forecast-card.css";

import { getWeatherCodeBackground } from "../../services/utils/weatherConstants";

import WeatherIcon from "./../../assets/WeatherIcon";

export function ForecastDayCard({ data = null }) {
    let bgColor = getWeatherCodeBackground(data.weatherCode);

    let timeObject = new Date(data.timestamp);
    let month = timeObject.getMonth() + 1;
    let date = timeObject.getDate();
    let formattedDate = `${month}/${date}`;
    console.warn(formattedDate);
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
                <div className="forecast__temps">
                    <div className="forecast__temp forecast__temp--max">
                        <span className="forecast__temp-value">
                            {data.tempMax}
                        </span>
                        <span className="forecast__temp-unit">°</span>
                    </div>

                    <div className="forecast__temp forecast__temp--min">
                        <span className="forecast__temp-value">
                            {data.tempMin}
                        </span>
                        <span className="forecast__temp-unit">°</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
