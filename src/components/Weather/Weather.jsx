import { useWeather } from "../../hooks/useWeather";
import { CurrentWeather } from "../../services/utils/weatherCompile";
import "./weather.css";

import WeatherLocation from './WeatherLocation';
import WeatherIcon from './WeatherIcon';
import WeatherTemps from "./WeatherTemps";

export default function WeatherModule() {
    const { weather, loading, error } = useWeather();

    if (loading) return <p>Loading weather...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!weather) return <p>No weather data</p>;

    const current = CurrentWeather(weather);
    console.warn("Current Weather Data: ", current); //

    return (
        <div className="weather">
            <div className="weather__header">
                <WeatherLocation />
            </div>
            <div className="weather__body">
                <div className="weather__primary">
                    <WeatherIcon/>
                    <WeatherTemps/>
                </div>
                <div className="weather__secondary"></div>
            </div>
        </div>
    );
}

function testWeatherModule() {
    <div className="weather">
        {/* Primary Weather Stats: Code + Temperature */}
        <div className="weather__primary">
            {/* Weather Condition Icon & Label */}
            {/* Current Temperature + High/Low Range */}
            <div className="stat stat--temperature">
                <div className="stat__measurement">
                    <span className="stat__value" id="weatherCurrentTemp">
                        --
                    </span>
                    <span className="stat__unit">°C</span>
                </div>
                <div className="stat__range">
                    <div className="stat__measurement">
                        <span className="stat__label">H:</span>
                        <span className="stat__value" id="weatherMaxTemp">
                            --
                        </span>
                        <span className="stat__unit">°C</span>
                    </div>
                    <div className="stat__measurement">
                        <span className="stat__label">L:</span>
                        <span className="stat__value" id="weatherMinTemp">
                            --
                        </span>
                        <span className="stat__unit">°C</span>
                    </div>
                </div>
            </div>
        </div>
        {/* Secondary Weather Stats: Wind, Humidity, Variable */}
        <div className="weather__secondary">
            {/* Wind Speed */}
            <div className="stat stat--wind">
                <span className="stat__icon" />
                <div className="stat__container">
                    <span className="stat__label">Wind</span>
                    <div className="stat__measurement">
                        <span className="stat__value" id="weatherWind">
                            --
                        </span>
                        <span className="stat__unit">m/s</span>
                    </div>
                </div>
            </div>
            {/* Humidity Percentage */}
            <div className="stat stat--humidity">
                <span className="stat__icon" id="weatherHumidityIcon" />
                <div className="stat__container">
                    <span className="stat__label" id="weatherHumidityLabel">
                        Humidity
                    </span>
                    <div className="stat__measurement">
                        <span className="stat__value" id="weatherHumidity">
                            --
                        </span>
                        <span className="stat__unit" id="weatherHumidityUnit">
                            %
                        </span>
                    </div>
                </div>
            </div>
            {/* Variable Metric (Precipitation / UV Index / Snowfall) */}
            <div className="stat stat--variable">
                <span className="stat__icon" id="weatherVariableIcon" />
                <div className="stat__container">
                    <span className="stat__label" id="weatherVariableLabel">
                        Precipitation
                    </span>
                    <div className="stat__measurement">
                        <span className="stat__value" id="weatherVariable">
                            --
                        </span>
                        <span className="stat__unit" id="weatherVariableUnit">
                            %
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}
