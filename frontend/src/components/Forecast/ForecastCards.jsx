// ForecastCards.jsx
import "./forecast-card.css"

import {
    getWeatherIcon,
    CODE_MAP,
    getWeatherCodeBackground,
} from "../../services/utils/weatherConstants";

import WeatherIcon from './../../assets/WeatherIcon';
import { DailyForecastCompiled } from "../../services/utils/weatherCompile";

export function ForecastDayCard({ data = null }) {
    let bgColor = getWeatherCodeBackground(data.weatherCode)
    console.log(data.weatherCode)

    let timeObject = new Date(data.timeStamp)
    return (
        <div className="card card--forecast" style={{ "--wc-forecast-bg-gradient": bgColor}}>
            <div className="card__header">
                <p> 12/25 </p>
            </div>

            <div className="card__body">
                <WeatherIcon weatherCode={data.weatherCode}/>
            </div>

            <div className="card__footer">
                <p> Footer </p>
            </div>
        </div>
    );
}
