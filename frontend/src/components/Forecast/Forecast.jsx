import { useWeather } from "../../hooks/useWeather";

import {
    DailyForecastCompiled,
    DailyWeather,
} from "../../services/utils/weatherCompile";

import { ForecastDayCard } from "./ForecastCards";

import "./forecast.css";

import Holding from "../../assets/Holding";

export default function Forecast() {
    const { weather, loading, error } = useWeather();

    if (loading || !weather || !weather) {
        var message = "Loading weather...";
        if (loading) message = "Loading weather...";
        if (error) message = `Error: ${error}`;
        if (!weather) message = "No weather data available";

        return (
            <div className="forecast module">
                <Holding message={message} />
            </div>
        );
    }

    const DATA = DailyForecastCompiled(DailyWeather(weather));

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
                        <ForecastDayCard data={day} />
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
