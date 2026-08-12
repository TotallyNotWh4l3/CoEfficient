import React from "react";
import "../weather.css";

/**
 * Props:
 * - activeTab: 'hourly' | 'daily'
 * - onChangeTab: (tab) => void
 * - isJapanese: boolean
 */
export default function WeatherTabsBar({ activeTab, onChangeTab, isJapanese }) {
    return (
        <div className="weather-tabs">
            <div className="weather-tabs__group">
                <button
                    onClick={() => onChangeTab("hourly")}
                    className={`weather-tabs__btn${activeTab === "hourly" ? " weather-tabs__btn--active" : ""}`}
                >
                    {isJapanese ? "24時間予報" : "Hourly"}
                </button>
                <button
                    onClick={() => onChangeTab("daily")}
                    className={`weather-tabs__btn${activeTab === "daily" ? " weather-tabs__btn--active" : ""}`}
                >
                    {isJapanese ? "7日間推移" : "7-Day Trend"}
                </button>
            </div>

            <div className="weather-tabs__hint">
                {activeTab === "hourly" ? (
                    <span className="weather-tabs__hint--cyan">
                        {isJapanese
                            ? "← 上の日付カードをクリックして時間別予報を切り替え"
                            : "← Click a day card above to switch hours"}
                    </span>
                ) : (
                    <span className="weather-tabs__hint--white">
                        {isJapanese ? "毎日一括 7日推移グラフ" : "7-DAY MULTI-VARIATE TREND GRAPH"}
                    </span>
                )}
            </div>
        </div>
    );
}
