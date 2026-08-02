import React from "react";
import { MapPin, Settings } from "lucide-react";
import "../weather.css";

/**
 * Top row: facility (location) dropdown on the left,
 * settings + remove actions on the right.
 *
 * Props:
 * - facilities: [{ id, nameEn, nameJa }]
 * - facilityId: string (currently selected)
 * - onFacilityChange: (id) => void
 * - isJapanese: boolean
 * - isManagerOrAbove: boolean — gates the settings button
 * - showSettings: boolean
 * - onToggleSettings: () => void
 * - onRemove: () => void
 */
export default function WeatherHeader({
    facilities = [],
    facilityId,
    onFacilityChange,
    isJapanese,
    isManagerOrAbove,
    showSettings,
    onToggleSettings,
    onRemove,
}) {
    return (
        <div className="weather-header">
            <div className="weather-header__location">
                <MapPin className="weather-header__pin-icon" />
                <select
                    value={facilityId}
                    onChange={(e) => onFacilityChange && onFacilityChange(e.target.value)}
                    className="weather-header__select"
                >
                    {facilities.map((fac) => (
                        <option key={fac.id} value={fac.id}>
                            {isJapanese ? fac.nameJa : fac.nameEn}
                        </option>
                    ))}
                </select>
                <span className="weather-header__select-arrow">▼</span>
            </div>

            <div className="weather-header__actions">
                {isManagerOrAbove && (
                    <button
                        onClick={onToggleSettings}
                        className={`weather-header__icon-btn${showSettings ? " weather-header__icon-btn--settings-active" : ""}`}
                        title="Module Settings"
                    >
                        <Settings className="weather-header__pin-icon" />
                    </button>
                )}
                <button
                    onClick={onRemove}
                    className="weather-header__icon-btn weather-header__icon-btn--remove"
                    title="Remove from board"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
