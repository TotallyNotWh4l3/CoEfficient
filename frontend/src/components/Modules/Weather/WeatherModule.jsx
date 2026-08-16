import React, { useState, useEffect } from "react";
import WeatherHeader from "./components/WeatherHeader";
import WeatherCurrentSummary from "./components/WeatherCurrentSummary";
import WeatherStatsRow from "./components/WeatherStatsRow";
import WeatherForecastSection from "./components/WeatherForecastSection";
import WeatherSettingsPanel from "./components/WeatherSettingsPanel";
import { getWeatherGradient } from "./utils/weatherHelpers";
import "./weather.css";

export default function WeatherModule({
    locationOptions = [],
    selectedLocationId,
    onLocationChange,
    current = {},
    dailyList = [],
    hourlyByDay = {},
    isJapanese = false,
    userRole,
    layoutMode = "combined",
    onLayoutModeChange,
    onRemove,
}) {
    const [activeTab, setActiveTab] = useState("hourly");
    const [activeMetric, setActiveMetric] = useState("temp");
    const [selectedDayIdx, setSelectedDayIdx] = useState(0);
    const [showSettings, setShowSettings] = useState(false);
    const [localLayoutMode, setLocalLayoutMode] = useState(layoutMode);

    useEffect(() => {
        setLocalLayoutMode(layoutMode);
    }, [layoutMode]);

    const isManagerOrAbove = userRole && ["manager", "admin"].includes(userRole.toLowerCase());

    const {
        temperature = 0,
        humidity = 0,
        windSpeed = 0,
        precipChance = 0,
        weatherCode = 3,
        isDay = 1,
        highTemp = 0,
        lowTemp = 0,
        time = "--:--",
    } = current;

    const gradient = getWeatherGradient(weatherCode, isDay);

    const chartDataset =
        activeTab === "hourly"
            ? (hourlyByDay[selectedDayIdx] || []).map((item) => ({
                  label: item.time,
                  value: item[activeMetric],
                  valueMax: item.maxTemp,
                  valueMin: item.minTemp,
              }))
            : dailyList.map((item) => ({
                  label: item.dayLabel,
                  value: item[activeMetric],
                  valueMax: item.maxTemp,
                  valueMin: item.minTemp,
              }));

    const handleLayoutModeChange = (mode) => {
        setLocalLayoutMode(mode);
        onLayoutModeChange && onLayoutModeChange(mode);
    };

    return (
        <div className="weather-card" style={{ background: gradient }}>
            <WeatherHeader
                locationOptions={locationOptions}
                selectedLocationId={selectedLocationId}
                onLocationChange={onLocationChange}
                isManagerOrAbove={isManagerOrAbove}
                showSettings={showSettings}
                onToggleSettings={() => setShowSettings((s) => !s)}
                onRemove={onRemove}
            />

            {localLayoutMode !== "forecast" && (
                <WeatherCurrentSummary
                    weatherCode={weatherCode}
                    isDay={isDay}
                    temp={temperature}
                    highTemp={highTemp}
                    lowTemp={lowTemp}
                    isJapanese={isJapanese} // still needed for getWeatherDescText
                />
            )}

            {localLayoutMode !== "forecast" && (
                <WeatherStatsRow
                    humidity={humidity}
                    windSpeed={windSpeed}
                    precipChance={precipChance}
                    // isJapanese removed — no longer used inside
                />
            )}

            {localLayoutMode !== "current" && (
                <WeatherForecastSection
                    isJapanese={isJapanese}
                    activeMetric={activeMetric}
                    onSelectMetric={setActiveMetric}
                    dailyList={dailyList}
                    activeTab={activeTab}
                    onChangeTab={setActiveTab}
                    selectedDayIdx={selectedDayIdx}
                    onSelectDay={setSelectedDayIdx}
                    chartDataset={chartDataset}
                    timeString={time}
                />
            )}

            {showSettings && (
                <WeatherSettingsPanel
                    layoutMode={localLayoutMode}
                    onLayoutModeChange={handleLayoutModeChange}
                    onClose={() => setShowSettings(false)}
                    // isJapanese removed
                />
            )}

            <div className="weather-card__flare-top" />
            <div className="weather-card__flare-bottom" />
        </div>
    );
}
