import React, { useEffect, useMemo, useState } from "react";

import useWeather from "../../../hooks/useWeather";

import WeatherHeader from "./components/WeatherHeader";
import WeatherCurrentSummary from "./components/WeatherCurrentSummary";
import WeatherStatsRow from "./components/WeatherStatsRow";
import WeatherForecastSection from "./components/WeatherForecastSection";
import WeatherSettingsPanel from "./components/WeatherSettingsPanel";

import { getWeatherGradient } from "../../../../../shared/constants/weather/weatherGradients";

import "./weather.css";

export default function WeatherModule({
    isJapanese = false,
    userRole,
    layoutMode = "combined",
    onLayoutModeChange,
    onRemove,
}) {
    const { weather, loading, error } = useWeather();
    const [activeTab, setActiveTab] = useState("hourly");
    const [activeMetric, setActiveMetric] = useState("temp");
    const [selectedDayIdx, setSelectedDayIdx] = useState(0);
    const [showSettings, setShowSettings] = useState(false);
    const [localLayoutMode, setLocalLayoutMode] = useState(layoutMode);

    useEffect(() => {
        setLocalLayoutMode(layoutMode);
    }, [layoutMode]);

    const isManagerOrAbove = userRole && ["manager", "admin"].includes(userRole.toLowerCase());

    if (loading) {
        return <div className="weather-card">Loading weather...</div>;
    }

    if (error) {
        return <div className="weather-card">Failed to load weather.</div>;
    }

    if (!weather) {
        return null;
    }

    const current = weather.current;
    const daily = weather.daily;
    const hourly = weather.hourly;

    const facilities = [
        {
            id: "default",
            nameEn: weather.location.name,
            nameJa: weather.location.name,
        },
    ];

    const dailyList = daily.map((day) => ({
        dayLabel: new Date(day.date).toLocaleDateString(isJapanese ? "ja-JP" : "en-US", {
            weekday: "short",
        }),
        maxTemp: day.high,
        minTemp: day.low,
        weatherCode: day.weatherCode,
        humidity: null,
        precipChance: day.precipitation,
        precipSum: day.precipitationSum,
        windSpeed: day.windSpeed,
    }));

    const hourlyByDay = useMemo(() => {
        const grouped = {};

        daily.forEach((day, dayIndex) => {
            grouped[dayIndex] = hourly
                .filter((hour) => hour.time.startsWith(day.date))
                .map((hour) => ({
                    time: hour.time.slice(11, 16),
                    temp: hour.temperature,
                    maxTemp: null,
                    minTemp: null,
                    humidity: hour.humidity,
                    precipChance: hour.precipitation,
                    precipSum: hour.precipitationSum,
                    windSpeed: hour.windSpeed,
                }));
        });

        return grouped;
    }, [daily, hourly]);

    const chartDataset = useMemo(() => {
        if (activeTab === "hourly") {
            return (hourlyByDay[selectedDayIdx] ?? []).map((item) => ({
                label: item.time,
                value: item[activeMetric],
                valueMax: item.maxTemp,
                valueMin: item.minTemp,
            }));
        }

        return dailyList.map((item) => ({
            label: item.dayLabel,
            value: item[activeMetric],
            valueMax: item.maxTemp,
            valueMin: item.minTemp,
        }));
    }, [activeMetric, activeTab, selectedDayIdx, dailyList, hourlyByDay]);

    const gradient = getWeatherGradient(current.weatherCode, current.isDay);

    function handleLayoutModeChange(mode) {
        setLocalLayoutMode(mode);
        onLayoutModeChange?.(mode);
    }

    return (
        <div className="weather-card" style={{ background: gradient }}>
            <WeatherHeader
                facilities={facilities}
                facilityId="default"
                onFacilityChange={() => {}}
                isJapanese={isJapanese}
                isManagerOrAbove={isManagerOrAbove}
                showSettings={showSettings}
                onToggleSettings={() => setShowSettings((prev) => !prev)}
                onRemove={onRemove}
            />

            {localLayoutMode !== "forecast" && (
                <WeatherCurrentSummary
                    weatherCode={current.weatherCode}
                    isDay={current.isDay}
                    temp={current.temperature}
                    highTemp={daily[0]?.high ?? 0}
                    lowTemp={daily[0]?.low ?? 0}
                    isJapanese={isJapanese}
                />
            )}

            {localLayoutMode !== "forecast" && (
                <WeatherStatsRow
                    humidity={current.humidity}
                    windSpeed={current.windSpeed}
                    precipChance={daily[0]?.precipitation ?? 0}
                    isJapanese={isJapanese}
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
                    timeString={current.time}
                />
            )}

            {showSettings && (
                <WeatherSettingsPanel
                    isJapanese={isJapanese}
                    layoutMode={localLayoutMode}
                    onLayoutModeChange={handleLayoutModeChange}
                    onClose={() => setShowSettings(false)}
                />
            )}

            <div className="weather-card__flare-top" />
            <div className="weather-card__flare-bottom" />
        </div>
    );
}
