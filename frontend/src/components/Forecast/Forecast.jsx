import { useWeather } from "../../hooks/useWeather";

import { DailyWeather } from "../../services/utils/weatherCompile";

import { ForecastDayCard } from "./ForecastCards";

import "./forecast.css";

export default function Forecast() {
    const { weather, loading, error } = useWeather();

    if (loading) return <p>Loading forecast...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!weather) return <p>No forecast data</p>;

    const DAY = DailyWeather(weather);
    console.log(DAY);

    var forecastDay = {
        1: {},
    };

    return (
        <div className="forecast module">
            <div className="forecast__header">
                <p className="forecast__title"> Header </p>
                {/* <div className="forecast__controls">
                    <button className="forecast__btn forecast__btn--chart">
                        <i className="ti ti-chart-line"></i>
                    </button>
                    <button className="forecast__btn forecast__btn--settings">
                        <i className="ti ti-settings"></i>
                    </button>
                </div> */}
            </div>

            <div className="forecast__body">
                <div className="forecast__cards">
                    <ForecastDayCard />
                    <ForecastDayCard />
                    <ForecastDayCard />
                    <ForecastDayCard />
                    <ForecastDayCard />
                    <ForecastDayCard />
                    <ForecastDayCard />
                </div>
            </div>

            <div className="forecast__graph">
                <p className="forecast__graph-placeholder">
                    [ Temperature Trend Graph ]
                </p>
            </div>

            <div className="forecast__footer">
                <p> Footer </p>
            </div>
        </div>
    );
}
