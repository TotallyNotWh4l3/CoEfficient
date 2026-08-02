import React from "react";
import { Clock } from "lucide-react";
import WeatherMetricSelector from "./WeatherMetricSelector";
import WeatherDailyGrid from "./WeatherDailyGrid";
import WeatherTabsBar from "./WeatherTabsBar";
import WeatherChart from "./WeatherChart";
import { METRIC_DEFS } from "../utils/weatherHelpers";
import "../weather.css";

/**
 * Props:
 * - isJapanese: boolean
 * - activeMetric: string
 * - onSelectMetric: (id) => void
 * - dailyList: [{ dayLabel, maxTemp, minTemp, weatherCode }]
 * - activeTab: 'hourly' | 'daily'
 * - onChangeTab: (tab) => void
 * - selectedDayIdx: number
 * - onSelectDay: (idx) => void
 * - chartDataset: [{ label, value, valueMax?, valueMin? }]
 * - timeString: string — "last updated" label
 */
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
    const activeMetricInfo = METRIC_DEFS.find((m) => m.id === activeMetric) || METRIC_DEFS[0];

    return (
        <>
            <div className="weather-section-title">
                <span className="weather-section-title__label">
                    {isJapanese ? "予報分析" : "Forecast Trends"}
                </span>
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

            <WeatherTabsBar
                activeTab={activeTab}
                onChangeTab={onChangeTab}
                isJapanese={isJapanese}
            />

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
                        {isJapanese ? "最終同期:" : "UPDATED:"} {timeString}
                    </span>
                </div>
            </div>
        </>
    );
}
