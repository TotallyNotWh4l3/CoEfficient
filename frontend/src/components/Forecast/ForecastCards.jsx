// ForecastCards.jsx
import "./forecast-card.css"

import {
    getWeatherIcon,
    CODE_MAP,
} from "../../services/utils/weatherConstants";

export function ForecastDayCard({ data = null }) {
    console.log(data);
    return (
        <div className="card care--forecast">
            <div className="card__header">
                <p> Header </p>
            </div>

            <div className="card__body">
                <p> Body </p>
            </div>

            <div className="card__footer">
                <p> Footer </p>
            </div>
        </div>
    );
}
