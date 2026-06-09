import { useWeather } from "../../hooks/useWeather";

import {
    DailyForecastCompiled,
    DailyWeather,
} from "../../services/utils/weatherCompile";

import { ForecastDayCard } from "./ForecastCards";

import "./forecast.css";
import Placeholder from "../../assets/Placeholder";
import renderPlaceholder from "../../assets/Placeholder";

export default function Forecast() {
    const { weather, loading, error } = useWeather();

    const DATA = DailyForecastCompiled(DailyWeather(weather));
    if (loading || error || !weather) {
        let moduleName, message, className;
        moduleName = "Weather Module";
        className = "weather ";
        if (loading) {
            message = "Loading..";
            className += "placeholder--loading";
            return (
                <Placeholder
                    moduleName={moduleName}
                    className={className}
                    message={message}
                />
            );
        }
        if (error) {
            message = "Error Occoured..";
            className += "placeholder--error";
            return (
                <Placeholder
                    moduleName={moduleName}
                    className={className}
                    message={message}
                    errMessage={error}
                />
            );
        }
        if (!weather) {
            message = "Data Not Found";
            className += "placeholder--data-not-found";
            return (
                <Placeholder
                    moduleName={moduleName}
                    className={className}
                    message={message}
                />
            );
        }
    }

    return (
        <div className="forecast module">
            {/* <div className="forecast__header">
                <p className="forecast__title"> Header </p>
                <div className="forecast__controls">
                    <button className="forecast__btn forecast__btn--chart">
                        <i className="ti ti-chart-line"></i>
                    </button>
                    <button className="forecast__btn forecast__btn--settings">
                        <i className="ti ti-settings"></i>
                    </button>
                </div>
            </div> */}

            <div className="forecast__body">
                <div className="forecast__cards">
                    {DATA.map((day) => (
                        <ForecastDayCard key={day.id} data={day} />
                    ))}
                </div>
            </div>

            <div className="forecast__graph">
                <p className="forecast__graph-placeholder">
                    [ Temperature Trend Graph ]
                </p>
            </div>

            {/* <div className="forecast__footer">
                <p> Footer </p>
            </div> */}
        </div>
    );
}
