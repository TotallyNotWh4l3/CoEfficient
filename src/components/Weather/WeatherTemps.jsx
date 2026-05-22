import "./weather-temps.css";

function WeatherMeasurement({ label = "", value = "N/A", unit = "°C" }) {
    return (
        <div className="weather__measurement">
            <span className="weather__label">{label}</span>
            <span className="weather__value">{value}</span>
            <span className="weather__unit">{unit}</span>
        </div>
    );
}

export default function WeatherTemps({
    currentTemp = "25",
    maxTemp = "30",
    minTemp = "20",
    unitTemp = "°C",
} = {}) {
    return (
        <div className="weather__stat--temperature">
            <WeatherMeasurement value={currentTemp} unit={unitTemp} />
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
