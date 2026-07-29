import "./weather-module.css";

import WeatherHeader from "./WeatherHeader";
import WeatherCurrent from "./WeatherCurrent";
import WeatherDetails from "./WeatherDetails";
import WeatherChart from "./WeatherChart";
import WeatherForecast from "./WeatherForecast";

import useWeather from "../../../hooks/useWeather";
import { getWeatherGradient } from "../../../utils/weatherGradients";

const WeatherModule = () => {
    const { weather, loading, error } = useWeather();

    if (loading) {
        return <section className="weather-module">Loading weather...</section>;
    }

    if (error) {
        return <section className="weather-module">Failed to load weather.</section>;
    }

    if (!weather) {
        return null;
    }

    const current = {
        location: weather.location.name ?? "Current Location",

        temperature: weather.current.temperature,

        condition: weather.current.description,

        high: weather.daily[0].high,

        low: weather.daily[0].low,

        humidity: weather.current.humidity,

        wind: weather.current.windSpeed,

        icon: weather.current.icon,
    };

    const forecast = weather.daily.map((day) => ({
        day: new Date(day.date).toLocaleDateString("en-US", {
            weekday: "short",
        }),

        icon: day.icon,

        high: day.high,

        low: day.low,
    }));

    const background = getWeatherGradient(weather.current.weatherCode, weather.current.isDay);

    return (
        <section
            className="weather-module"
            style={{
                background,
            }}
        >
            <WeatherHeader location={current.location} />

            <WeatherCurrent weather={current} />

            <WeatherDetails weather={current} />

            <WeatherChart hourly={weather.hourly} />

            <WeatherForecast forecast={forecast} />
        </section>
    );
};

export default WeatherModule;
