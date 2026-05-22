import { getWeatherIcon } from "../../services/utils/weatherConstants";
import "./weather-stats.css";

function WeatherMeasurement({ label = "", value = "N/A", unit = "°C" }) {
    return (
        <div className="weather__measurement">
            <span className="weather__label">{label}</span>
            <span className="weather__value">{value}</span>
            <span className="weather__unit">{unit}</span>
        </div>
    );
}

export function WeatherPrimaryIcon({
    weatherCode,
    isDay = true,
    isAnimated = true,
    isFill = true,
}) {
    const iconUrl = getWeatherIcon(weatherCode, isDay, isAnimated, isFill);
    console.log(`[WEATHER ICON]: Code ${weatherCode} -> ${iconUrl}`);

    return (
        <img
            className="weather-icon"
            src={iconUrl}
            alt={`Weather code ${weatherCode}`}
            onError={() =>
                console.error(`[WEATHER ICON]: Failed to load: ${iconUrl}`)
            }
        />
    );
}

export function WeatherPrimaryTemps({
    curTemp = "N/A",
    maxTemp = "N/A",
    minTemp = "N/A",
    unitTemp = "°C",
} = {}) {
    return (
        <div className="weather__stat--temperature">
            <WeatherMeasurement value={curTemp} unit={unitTemp} />
            <div className="weather__range">
                <WeatherMeasurement
                    label="H:"
                    value={maxTemp}
                    unit={unitTemp}
                />
                <WeatherMeasurement
                    label="L:"
                    value={minTemp}
                    unit={unitTemp}
                />
            </div>
        </div>
    );
}

export function WeatherSecondaryStats({
    label = "Label",
    value = "N/A",
    unit = "%",
    type = "humidity",
} = {}) {   
    return (
        <div className="weather__stat">
            <span className={`weather__icon weather__icon--${type}`} />
            <div className="weather__container">
                <span className="weather__label">{label}</span>
                <div className="weather__measurement">
                    <span className="weather__value">{value}</span>
                    <span className="weather__unit">{unit}</span>
                </div>
            </div>
        </div>
    );
}
