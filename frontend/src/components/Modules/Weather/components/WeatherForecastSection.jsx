import React from "react";
import { Clock } from "lucide-react";
import WeatherMetricSelector from "./WeatherMetricSelector";
import WeatherDailyGrid from "./WeatherDailyGrid";
import WeatherTabsBar from "./WeatherTabsBar";
import WeatherChart from "./WeatherChart";
import { METRIC_DEFS } from "../utils/weatherHelpers.jsx";
import { useLanguage } from "../../../../hooks/useLanguage";
import "../weather.css";

export default function WeatherForecastSection({
    isJapanese,
    activeMetric,
    onSelectMetric,
    dailyList,
    activeTab,
    onChangeTab,
    selectedDayIdx,
    onSelectDay,
    chartDataset,
    timeString,
}) {
    const lang = useLanguage();
    const t = lang.modules.weather.forecast;
    const activeMetricInfo = METRIC_DEFS.find((m) => m.id === activeMetric) || METRIC_DEFS[0];

    return (
        <>
            <div className="weather-section-title">
                <span className="weather-section-title__label">{t.title}</span>
                <span className="weather-section-title__rule"></span>
            </div>

            <WeatherMetricSelector
                activeMetric={activeMetric}
                onSelectMetric={onSelectMetric}
                isJapanese={isJapanese}
            />

            <WeatherDailyGrid
                dailyList={dailyList}
                activeTab={activeTab}
                selectedDayIdx={selectedDayIdx}
                onSelectDay={onSelectDay}
            />

            <WeatherTabsBar activeTab={activeTab} onChangeTab={onChangeTab} />

            <WeatherChart
                dataset={chartDataset}
                metricInfo={activeMetricInfo}
                isJapanese={isJapanese}
                isHourly={activeTab === "hourly"}
            />

            <div className="weather-updated">
                <div className="weather-updated__inner">
                    <Clock className="weather-updated__icon" />
                    <span className="weather-updated__text">
                        {t.updated} {timeString}
                    </span>
                </div>
            </div>
        </>
    );
}
