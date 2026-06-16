import { useWeather } from "../../hooks/useWeather";

import {
    DailyForecastCompiled,
    DailyWeather,
} from "../../services/utils/weatherCompile";

import { ForecastDayCard } from "./ForecastCards";

import "./forecast.css";

import useErrorPlaceholder from "../../assets/PlaceholderUtils";

export default function Forecast() {
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
                    {DATA.slice(0, 7).map((dayData, index) => (
                        <ForecastDayCard key={index} data={dayData} />
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
