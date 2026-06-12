import { useWeather } from "../../hooks/useWeather";

import {
    DailyForecastCompiled,
    DailyWeather,
} from "../../services/utils/weatherCompile";

import { ForecastDayCard } from "./DailyForecastCards";

import "./daily-forecast.css";

import useErrorPlaceholder from "../../assets/PlaceholderUtils";

export default function DailyForecast() {
    var { weather, loading, error } = useWeather();
    
    const { isError, component } = useErrorPlaceholder(
        "forecast",
        loading,
        error,
        weather,
    );
    if (isError) return component;

    const DATA = DailyForecastCompiled(DailyWeather(weather));

    return (
        <div className="forecast module">
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
        </div>
    );
}

{
    /* <div className="forecast__header">
                <p className="forecast__title"> Header </p>
                <div className="forecast__controls">
                    <button className="forecast__btn forecast__btn--chart">
                        <i className="ti ti-chart-line"></i>
                    </button>
                    <button className="forecast__btn forecast__btn--settings">
                        <i className="ti ti-settings"></i>
                    </button>
                </div>
            </div> */
}

{
    /* <div className="forecast__footer">
                <p> Footer </p>
            </div> */
}
