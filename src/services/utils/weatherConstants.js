export const BASE_PATH = "/assets/weather-icons/";
export const CODE_MAP = {
    // Clear / Clouds
    0: { day: "clear-day.svg", night: "clear-night.svg", label: "Clear sky" },
    1: { day: "partly-cloudy-day.svg", night: "partly-cloudy-night.svg", label: "Mainly clear" },
    2: { day: "partly-cloudy-day.svg", night: "partly-cloudy-night.svg", label: "Partly cloudy" },
    3: { day: "overcast.svg", night: "overcast-night.svg", label: "Overcast" },
    // Fog
    45: { day: "fog-day.svg", night: "fog-night.svg", label: "Fog" },
    48: { day: "fog.svg", night: "fog.svg", label: "Depositing rime fog" },
    // Drizzle
    51: { day: "drizzle.svg", night: "drizzle.svg", label: "Light drizzle" },
    53: { day: "drizzle.svg", night: "drizzle.svg", label: "Moderate drizzle" },
    55: { day: "drizzle.svg", night: "drizzle.svg", label: "Dense drizzle" },
    // Freezing Drizzle
    56: { day: "sleet.svg", night: "sleet.svg", label: "Light freezing drizzle" },
    57: { day: "sleet.svg", night: "sleet.svg", label: "Dense freezing drizzle" },
    // Rain
    61: { day: "rain.svg", night: "rain.svg", label: "Slight rain" },
    63: { day: "rain.svg", night: "rain.svg", label: "Moderate rain" },
    65: { day: "rain.svg", night: "rain.svg", label: "Heavy rain" },
    // Freezing Rain
    66: { day: "sleet.svg", night: "sleet.svg", label: "Light freezing rain" },
    67: { day: "sleet.svg", night: "sleet.svg", label: "Heavy freezing rain" },
    // Snow
    71: { day: "snow.svg", night: "snow.svg", label: "Slight snow fall" },
    73: { day: "snow.svg", night: "snow.svg", label: "Moderate snow fall" },
    75: { day: "snow.svg", night: "snow.svg", label: "Heavy snow fall" },
    77: { day: "snowflake.svg", night: "snowflake.svg", label: "Snow grains" },
    // Rain Showers
    80: { day: "partly-cloudy-day-rain.svg", night: "partly-cloudy-night-rain.svg", label: "Slight rain showers" },
    81: { day: "partly-cloudy-day-rain.svg", night: "partly-cloudy-night-rain.svg", label: "Moderate rain showers" },
    82: { day: "partly-cloudy-day-rain.svg", night: "partly-cloudy-night-rain.svg", label: "Violent rain showers" },
    // Snow Showers
    85: { day: "partly-cloudy-day-snow.svg", night: "partly-cloudy-night-snow.svg", label: "Slight snow showers" },
    86: { day: "partly-cloudy-day-snow.svg", night: "partly-cloudy-night-snow.svg", label: "Heavy snow showers" },
    // Thunderstorms
    95: { day: "thunderstorms.svg", night: "thunderstorms.svg", label: "Thunderstorm" },
    96: { day: "thunderstorms-rain.svg", night: "thunderstorms-night-rain.svg", label: "Thunderstorm with slight hail" },
    99: {
        day: "thunderstorms-snow.svg",
        night: "thunderstorms-night-snow.svg",
        label: "Thunderstorm with heavy hail"
    },
};

const o = 0.75;
const rgba = (r, g, b) => `rgba(${r}, ${g}, ${b}, ${o})`;
export const WEATHER_GRADIENTS = {
    0: {
        0: `linear-gradient(135deg, ${rgba(5, 10, 25)} 0%, ${rgba(20, 30, 60)} 100%)`,
        1: `linear-gradient(135deg, ${rgba(10, 20, 40)} 0%, ${rgba(30, 50, 80)} 100%)`,
        2: `linear-gradient(135deg, ${rgba(25, 30, 45)} 0%, ${rgba(50, 60, 80)} 100%)`,
        3: `linear-gradient(135deg, ${rgba(20, 20, 25)} 0%, ${rgba(55, 55, 65)} 100%)`,

        45: `linear-gradient(135deg, ${rgba(40, 40, 50)} 0%, ${rgba(90, 90, 110)} 100%)`,
        48: `linear-gradient(135deg, ${rgba(50, 50, 60)} 0%, ${rgba(110, 110, 130)} 100%)`,

        51: `linear-gradient(135deg, ${rgba(20, 40, 60)} 0%, ${rgba(60, 90, 110)} 100%)`,
        53: `linear-gradient(135deg, ${rgba(15, 30, 50)} 0%, ${rgba(50, 70, 90)} 100%)`,
        55: `linear-gradient(135deg, ${rgba(10, 20, 40)} 0%, ${rgba(40, 60, 80)} 100%)`,

        56: `linear-gradient(135deg, ${rgba(20, 35, 55)} 0%, ${rgba(60, 85, 110)} 100%)`,
        57: `linear-gradient(135deg, ${rgba(15, 25, 45)} 0%, ${rgba(45, 65, 90)} 100%)`,

        61: `linear-gradient(135deg, ${rgba(10, 15, 25)} 0%, ${rgba(40, 60, 80)} 100%)`,
        63: `linear-gradient(135deg, ${rgba(10, 20, 35)} 0%, ${rgba(45, 70, 95)} 100%)`,
        65: `linear-gradient(135deg, ${rgba(5, 10, 20)} 0%, ${rgba(25, 40, 60)} 100%)`,

        66: `linear-gradient(135deg, ${rgba(20, 35, 55)} 0%, ${rgba(70, 100, 130)} 100%)`,
        67: `linear-gradient(135deg, ${rgba(15, 30, 50)} 0%, ${rgba(60, 90, 120)} 100%)`,

        71: `linear-gradient(135deg, ${rgba(30, 40, 60)} 0%, ${rgba(120, 150, 180)} 100%)`,
        73: `linear-gradient(135deg, ${rgba(35, 45, 65)} 0%, ${rgba(140, 170, 200)} 100%)`,
        75: `linear-gradient(135deg, ${rgba(25, 35, 55)} 0%, ${rgba(110, 140, 170)} 100%)`,

        77: `linear-gradient(135deg, ${rgba(25, 35, 55)} 0%, ${rgba(80, 110, 140)} 100%)`,

        80: `linear-gradient(135deg, ${rgba(15, 25, 40)} 0%, ${rgba(60, 80, 100)} 100%)`,
        81: `linear-gradient(135deg, ${rgba(10, 20, 35)} 0%, ${rgba(50, 75, 100)} 100%)`,
        82: `linear-gradient(135deg, ${rgba(5, 10, 20)} 0%, ${rgba(35, 55, 75)} 100%)`,

        85: `linear-gradient(135deg, ${rgba(30, 40, 60)} 0%, ${rgba(100, 130, 160)} 100%)`,
        86: `linear-gradient(135deg, ${rgba(25, 35, 55)} 0%, ${rgba(90, 120, 150)} 100%)`,

        95: `linear-gradient(135deg, ${rgba(5, 5, 15)} 0%, ${rgba(60, 70, 120)} 100%)`,
        96: `linear-gradient(135deg, ${rgba(20, 20, 50)} 0%, ${rgba(100, 110, 180)} 100%)`,
        99: `linear-gradient(135deg, ${rgba(10, 10, 30)} 0%, ${rgba(70, 80, 140)} 100%)`,
    },
    1: {
        0: `linear-gradient(135deg, ${rgba(70, 160, 255)} 0%, ${rgba(135, 200, 255)} 100%)`,
        1: `linear-gradient(135deg, ${rgba(100, 180, 255)} 0%, ${rgba(200, 230, 255)} 100%)`,
        2: `linear-gradient(135deg, ${rgba(140, 180, 220)} 0%, ${rgba(220, 230, 240)} 100%)`,
        3: `linear-gradient(135deg, ${rgba(150, 160, 170)} 0%, ${rgba(200, 210, 220)} 100%)`,

        45: `linear-gradient(135deg, ${rgba(200, 200, 200)} 0%, ${rgba(235, 235, 235)} 100%)`,
        48: `linear-gradient(135deg, ${rgba(190, 190, 190)} 0%, ${rgba(230, 230, 230)} 100%)`,

        51: `linear-gradient(135deg, ${rgba(120, 150, 170)} 0%, ${rgba(180, 200, 210)} 100%)`,
        53: `linear-gradient(135deg, ${rgba(110, 140, 160)} 0%, ${rgba(170, 190, 200)} 100%)`,
        55: `linear-gradient(135deg, ${rgba(100, 130, 150)} 0%, ${rgba(160, 180, 190)} 100%)`,

        56: `linear-gradient(135deg, ${rgba(150, 180, 210)} 0%, ${rgba(220, 240, 255)} 100%)`,
        57: `linear-gradient(135deg, ${rgba(140, 170, 200)} 0%, ${rgba(210, 230, 250)} 100%)`,

        61: `linear-gradient(135deg, ${rgba(90, 120, 150)} 0%, ${rgba(140, 170, 190)} 100%)`,
        63: `linear-gradient(135deg, ${rgba(70, 100, 130)} 0%, ${rgba(120, 150, 170)} 100%)`,
        65: `linear-gradient(135deg, ${rgba(60, 90, 120)} 0%, ${rgba(110, 140, 160)} 100%)`,

        66: `linear-gradient(135deg, ${rgba(150, 190, 230)} 0%, ${rgba(230, 250, 255)} 100%)`,
        67: `linear-gradient(135deg, ${rgba(140, 180, 220)} 0%, ${rgba(220, 240, 255)} 100%)`,

        71: `linear-gradient(135deg, ${rgba(220, 235, 245)} 0%, ${rgba(255, 255, 255)} 100%)`,
        73: `linear-gradient(135deg, ${rgba(210, 230, 245)} 0%, ${rgba(250, 250, 255)} 100%)`,
        75: `linear-gradient(135deg, ${rgba(200, 220, 240)} 0%, ${rgba(245, 245, 255)} 100%)`,

        77: `linear-gradient(135deg, ${rgba(210, 225, 240)} 0%, ${rgba(240, 245, 250)} 100%)`,

        80: `linear-gradient(135deg, ${rgba(100, 130, 160)} 0%, ${rgba(150, 180, 200)} 100%)`,
        81: `linear-gradient(135deg, ${rgba(80, 110, 140)} 0%, ${rgba(130, 160, 180)} 100%)`,
        82: `linear-gradient(135deg, ${rgba(70, 100, 130)} 0%, ${rgba(110, 140, 160)} 100%)`,

        85: `linear-gradient(135deg, ${rgba(200, 220, 240)} 0%, ${rgba(240, 250, 255)} 100%)`,
        86: `linear-gradient(135deg, ${rgba(190, 210, 235)} 0%, ${rgba(230, 245, 255)} 100%)`,

        95: `linear-gradient(135deg, ${rgba(70, 80, 100)} 0%, ${rgba(120, 130, 160)} 100%)`,
        96: `linear-gradient(135deg, ${rgba(80, 90, 120)} 0%, ${rgba(140, 150, 190)} 100%)`,
        99: `linear-gradient(135deg, ${rgba(60, 70, 110)} 0%, ${rgba(120, 130, 180)} 100%)`,
    },
};

export function getWeatherIcon(weatherCode, isDay = true, isAnimated = true, isFill = true) {
    const dayKey = isDay ? "day" : "night";
    const fillOrLine = isFill ? "fill" : "line";
    const animOrStatic = isAnimated ? "animated" : "static";
    const staticNameExtention = isAnimated ? "" : "wi-";

    if (!CODE_MAP[weatherCode][dayKey]) {
        console.warn(`[ICON]: Weather code ${weatherCode} not found in CODE_MAP. Using default.`);
        return `${BASE_PATH}${fillOrLine}/${animOrStatic}/${staticNameExtention}${CODE_MAP[0][dayKey]}`;
    }

    const iconFilename = CODE_MAP[weatherCode][dayKey];

    const iconPath = `${fillOrLine}/${animOrStatic}/${staticNameExtention}${iconFilename}`;
    return `${BASE_PATH}${iconPath}`;
}

export function getWeatherGradient(weatherCode, isDay) {
    const dayKey = isDay ? 1 : 0;
    return WEATHER_GRADIENTS[dayKey][weatherCode];
}

// Is there a to annotate function that returns a string as a path to an icon? Yes, but it would be more of a comment than a type annotation, since the return value is a string. You could add a JSDoc comment like this:
/**
 * Returns the file path to the appropriate weather icon based on the provided weather code and conditions.
 * @param {number} weatherCode - The weather code corresponding to the current weather condition.
 * @param {boolean} isDay - Indicates whether it is currently day (true) or night (false).
 * @param {boolean} isAnimated - Indicates whether to return the path for an animated icon (true) or a static icon (false).
 * @param {boolean} isFill - Indicates whether to return the path for a filled icon (true) or a line icon (false).
 * @return {string} The file path to the appropriate weather icon.
 *  
 * Example usage:
 * const iconPath = getWeatherIcon(0, true, true, true);
 *  * This would return the path to the animated, filled icon for clear day conditions.
 *  * Note: The weatherCode should correspond to the codes defined in the CODE_MAP constant.
 * * The function constructs the file path based on the weather code and the specified conditions (day/night, animated/static, fill/line) and returns it as a string.
 * * The returned string can then be used to set the source of an image element in a web application to display the appropriate weather icon.
 */