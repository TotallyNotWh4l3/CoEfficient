import { getWeatherIcon } from "../../services/utils/weatherConstants";
import "./weather-icon.css";

export default function WeatherIcon({weatherCode, isDay = true, isAnimated = true, isFill = true}){
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
