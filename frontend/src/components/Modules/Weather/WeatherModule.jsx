import React, { useState, useEffect } from 'react';
import WeatherHeader from './components/WeatherHeader';
import WeatherCurrentSummary from './components/WeatherCurrentSummary';
import WeatherStatsRow from './components/WeatherStatsRow';
import WeatherForecastSection from './components/WeatherForecastSection';
import WeatherSettingsPanel from './components/WeatherSettingsPanel';
import { getWeatherGradient } from './utils/weatherHelpers';
import './weather.css';

/**
 * WeatherModule — pure UI shell, no data-fetching or mock generation.
 * All weather data comes in as props from the parent/backend integration.
 *
 * Props:
 * - facilities: [{ id, nameEn, nameJa }]
 * - facilityId: string
 * - onFacilityChange: (id) => void
 *
 * - current: {
 *     temperature: number,
 *     humidity: number,
 *     windSpeed: number,
 *     precipChance: number,
 *     weatherCode: number,
 *     isDay: 0 | 1,
 *     highTemp: number,
 *     lowTemp: number,
 *     time: string,          // e.g. "14:00"
 *   }
 *
 * - dailyList: [{
 *     dayLabel: string,
 *     maxTemp: number,
 *     minTemp: number,
 *     weatherCode: number,
 *     humidity: number,
 *     precipChance: number,
 *     precipSum: number,
 *     windSpeed: number,
 *   }]
 *
 * - hourlyByDay: {
 *     [dayIndex]: [{
 *       time: string,
 *       temp: number,
 *       maxTemp: number,
 *       minTemp: number,
 *       humidity: number,
 *       precipChance: number,
 *       precipSum: number,
 *       windSpeed: number,
 *     }]
 *   }
 *
 * - isJapanese: boolean
 * - userRole: string ('manager' | 'admin' | ...)
 * - layoutMode: 'combined' | 'current' | 'forecast'
 * - onLayoutModeChange: (mode) => void
 * - onRemove: () => void
 */
export default function WeatherModule({
  facilities = [],
  facilityId,
  onFacilityChange,
  current = {},
  dailyList = [],
  hourlyByDay = {},
  isJapanese = false,
  userRole,
  layoutMode = 'combined',
  onLayoutModeChange,
  onRemove,
}) {
  const [activeTab, setActiveTab] = useState('hourly');
  const [activeMetric, setActiveMetric] = useState('temp');
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [localLayoutMode, setLocalLayoutMode] = useState(layoutMode);

  useEffect(() => {
    setLocalLayoutMode(layoutMode);
  }, [layoutMode]);

  const isManagerOrAbove = userRole && ['manager', 'admin'].includes(userRole.toLowerCase());

  const {
    temperature = 0,
    humidity = 0,
    windSpeed = 0,
    precipChance = 0,
    weatherCode = 3,
    isDay = 1,
    highTemp = 0,
    lowTemp = 0,
    time = '--:--',
  } = current;

  const gradient = getWeatherGradient(weatherCode, isDay);

  const chartDataset =
    activeTab === 'hourly'
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
        facilities={facilities}
        facilityId={facilityId}
        onFacilityChange={onFacilityChange}
        isJapanese={isJapanese}
        isManagerOrAbove={isManagerOrAbove}
        showSettings={showSettings}
        onToggleSettings={() => setShowSettings((s) => !s)}
        onRemove={onRemove}
      />

      {localLayoutMode !== 'forecast' && (
        <WeatherCurrentSummary
          weatherCode={weatherCode}
          isDay={isDay}
          temp={temperature}
          highTemp={highTemp}
          lowTemp={lowTemp}
          isJapanese={isJapanese}
        />
      )}

      {localLayoutMode !== 'forecast' && (
        <WeatherStatsRow
          humidity={humidity}
          windSpeed={windSpeed}
          precipChance={precipChance}
          isJapanese={isJapanese}
        />
      )}

      {localLayoutMode !== 'current' && (
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
