import { useWeather } from "../../hooks/useWeather";

import {
    DailyForecastCompiled,
    DailyWeather,
    HourlyWeather,
} from "../../services/utils/weatherCompile";

import { ForecastDayCard } from "./ForecastCards";
import ForecastGraph from "./ForecastGraph";

import "./forecast.css";

import useErrorPlaceholder from "../../assets/PlaceholderUtils";
import { DEFAULT_GRAPH_SETTINGS } from "./graphSettings";

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
                        <ForecastDayCard
                            key={index}
                            data={dayData}
                            isFirst={index === 0}
                        />
                    ))}
                </div>
            </div>

            <ForecastGraph
                data={HourlyWeather(weather)}
                settings={DEFAULT_GRAPH_SETTINGS}
            />
        </div>
    );
}
