import { getWeatherIcon } from "../services/utils/weatherConstants.js";

export default function WeatherIcon({
    className,
    weatherCode = 1,
    isDay = true,
    isAnimated = true,
    isFill = true,
}) {
    const iconUrl = getWeatherIcon(weatherCode, isDay, isAnimated, isFill);
    return (
        <img
            className={className}
            src={iconUrl}
            alt={`WeatherCode ${weatherCode}`}
            onError={() =>
                console.error(`[WEATHER ICON]: Failed to load: ${iconUrl}`)
            }
        />
    );
}
