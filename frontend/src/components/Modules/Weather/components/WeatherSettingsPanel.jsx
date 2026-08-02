import React from "react";
import { Settings } from "lucide-react";
import "../weather.css";

const LAYOUT_OPTIONS = [
    {
        mode: "combined",
        labelEn: "Combined View",
        labelJa: "総合（現在＆予報）",
        descEn: "Render both live and full 7-day extended forecasts in a master bento block.",
        descJa: "現在の実況と7日間の長期予報トレンドを一枚に収めた標準的な総合表示。",
    },
    {
        mode: "current",
        labelEn: "Only Current Weather",
        labelJa: "現在実況のみ（超コンパクト）",
        descEn: "Render extreme high-density current conditions stats with no forecast tables.",
        descJa: "長期予報および推移図をすべて非表示にし、現在の実況と主要数値に特化します。",
    },
    {
        mode: "forecast",
        labelEn: "Only Forecast Trends",
        labelJa: "長期予報のみ",
        descEn: "Render full 7-day extended forecasts & SVG chart with minimal current status clutter.",
        descJa: "現在の気温数値等を省略し、7日の動向予報とチャート推移図を大きく精細に表示。",
    },
];

/**
 * Props:
 * - isJapanese: boolean
 * - layoutMode: 'combined' | 'current' | 'forecast'
 * - onLayoutModeChange: (mode) => void
 * - onClose: () => void
 */
export default function WeatherSettingsPanel({
    isJapanese,
    layoutMode,
    onLayoutModeChange,
    onClose,
}) {
    return (
        <div className="weather-settings">
            <div className="weather-settings__header">
                <span className="weather-settings__title">
                    <Settings className="weather-settings__title-icon" />
                    {isJapanese ? "気象モジュール設定" : "Weather Card Settings"}
                </span>
                <button onClick={onClose} className="weather-settings__back">
                    {isJapanese ? "戻る" : "Back"}
                </button>
            </div>

            <div className="weather-settings__body">
                <div className="weather-settings__group">
                    <label className="weather-settings__group-label">
                        {isJapanese ? "レイアウト表示モード" : "Layout Display Mode"}
                    </label>

                    <div className="weather-settings__options">
                        {LAYOUT_OPTIONS.map((item) => {
                            const isActive = layoutMode === item.mode;
                            return (
                                <button
                                    key={item.mode}
                                    onClick={() =>
                                        onLayoutModeChange && onLayoutModeChange(item.mode)
                                    }
                                    className={`weather-settings__option${isActive ? " weather-settings__option--active" : ""}`}
                                >
                                    <div className="weather-settings__option-top">
                                        <span className="weather-settings__option-name">
                                            {isJapanese ? item.labelJa : item.labelEn}
                                        </span>
                                        {isActive && (
                                            <span className="weather-settings__option-active-tag">
                                                ● ACTIVE
                                            </span>
                                        )}
                                    </div>
                                    <span className="weather-settings__option-desc">
                                        {isJapanese ? item.descJa : item.descEn}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="weather-settings__tip">
                    💡{" "}
                    {isJapanese
                        ? "管理 authority を使って、モジュールのグリッド幅（カラム数）も自由にカスタマイズ可能です。"
                        : "Tip: Use advanced admin controls in main settings to toggle responsive column counts for this tile."}
                </div>
            </div>
        </div>
    );
}
