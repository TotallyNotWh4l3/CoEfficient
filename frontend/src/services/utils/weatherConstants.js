export const BASE_PATH = "/assets/weather-icons/";
export const CODE_MAP = {
    // Clear / Clouds
    0: { day: "clear-day.svg", night: "clear-night.svg", label: "Clear sky" },
    1: {
        day: "partly-cloudy-day.svg",
        night: "partly-cloudy-night.svg",
        label: "Mainly clear",
    },
    2: {
        day: "partly-cloudy-day.svg",
        night: "partly-cloudy-night.svg",
        label: "Partly cloudy",
    },
    3: { day: "overcast.svg", night: "overcast-night.svg", label: "Overcast" },
    // Fog
    45: { day: "fog-day.svg", night: "fog-night.svg", label: "Fog" },
    48: { day: "fog.svg", night: "fog.svg", label: "Depositing rime fog" },
    // Drizzle
    51: { day: "drizzle.svg", night: "drizzle.svg", label: "Light drizzle" },
    53: { day: "drizzle.svg", night: "drizzle.svg", label: "Moderate drizzle" },
    55: { day: "drizzle.svg", night: "drizzle.svg", label: "Dense drizzle" },
    // Freezing Drizzle
    56: {
        day: "sleet.svg",
        night: "sleet.svg",
        label: "Light freezing drizzle",
    },
    57: {
        day: "sleet.svg",
        night: "sleet.svg",
        label: "Dense freezing drizzle",
    },
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
    80: {
        day: "partly-cloudy-day-rain.svg",
        night: "partly-cloudy-night-rain.svg",
        label: "Slight rain showers",
    },
    81: {
        day: "partly-cloudy-day-rain.svg",
        night: "partly-cloudy-night-rain.svg",
        label: "Moderate rain showers",
    },
    82: {
        day: "partly-cloudy-day-rain.svg",
        night: "partly-cloudy-night-rain.svg",
        label: "Violent rain showers",
    },
    // Snow Showers
    85: {
        day: "partly-cloudy-day-snow.svg",
        night: "partly-cloudy-night-snow.svg",
        label: "Slight snow showers",
    },
    86: {
        day: "partly-cloudy-day-snow.svg",
        night: "partly-cloudy-night-snow.svg",
        label: "Heavy snow showers",
    },
    // Thunderstorms
    95: {
        day: "thunderstorms.svg",
        night: "thunderstorms.svg",
        label: "Thunderstorm",
    },
    96: {
        day: "thunderstorms-rain.svg",
        night: "thunderstorms-night-rain.svg",
        label: "Thunderstorm with slight hail",
    },
    99: {
        day: "thunderstorms-snow.svg",
        night: "thunderstorms-night-snow.svg",
        label: "Thunderstorm with heavy hail",
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

const TEXT_DARK = {
    main: "rgba(255,255,255,0.98)",
    sub1: "rgba(255,255,255,0.85)",
    sub2: "rgba(255,255,255,0.65)",
    sub3: "rgba(255,255,255,0.45)",
};

const TEXT_MEDIUM = {
    main: "rgba(250,250,250,0.96)",
    sub1: "rgba(235,240,245,0.82)",
    sub2: "rgba(210,220,230,0.65)",
    sub3: "rgba(185,195,205,0.45)",
};

const TEXT_LIGHT = {
    main: "rgba(250,250,250,0.96)",
    sub1: "rgba(235,240,245,0.82)",
    sub2: "rgba(210,220,230,0.65)",
    sub3: "rgba(185,195,205,0.45)",
};

export const TEXT_COLOR_MAP = {
    0: {
        0: TEXT_DARK,
        1: TEXT_DARK,
        2: TEXT_DARK,
        3: TEXT_DARK,

        45: TEXT_LIGHT,
        48: TEXT_LIGHT,

        51: TEXT_DARK,
        53: TEXT_DARK,
        55: TEXT_DARK,
        56: TEXT_DARK,
        57: TEXT_DARK,

        61: TEXT_DARK,
        63: TEXT_DARK,
        65: TEXT_DARK,
        66: TEXT_DARK,
        67: TEXT_DARK,

        71: TEXT_LIGHT,
        73: TEXT_LIGHT,
        75: TEXT_LIGHT,
        77: TEXT_MEDIUM,

        80: TEXT_DARK,
        81: TEXT_DARK,
        82: TEXT_DARK,

        85: TEXT_LIGHT,
        86: TEXT_LIGHT,

        95: TEXT_DARK,
        96: TEXT_DARK,
        99: TEXT_DARK,
    },
    1: {
        0: TEXT_LIGHT,
        1: TEXT_LIGHT,

        2: TEXT_MEDIUM,
        3: TEXT_MEDIUM,

        45: TEXT_LIGHT,
        48: TEXT_LIGHT,

        51: TEXT_MEDIUM,
        53: TEXT_MEDIUM,
        55: TEXT_MEDIUM,

        56: TEXT_LIGHT,
        57: TEXT_LIGHT,

        61: TEXT_MEDIUM,
        63: TEXT_MEDIUM,
        65: TEXT_MEDIUM,

        66: TEXT_LIGHT,
        67: TEXT_LIGHT,

        71: TEXT_LIGHT,
        73: TEXT_LIGHT,
        75: TEXT_LIGHT,
        77: TEXT_LIGHT,

        80: TEXT_MEDIUM,
        81: TEXT_MEDIUM,
        82: TEXT_MEDIUM,

        85: TEXT_LIGHT,
        86: TEXT_LIGHT,

        95: TEXT_DARK,
        96: TEXT_DARK,
        99: TEXT_DARK,
    },
};

export function getWeatherIcon(
    weatherCode,
    isDay = true,
    isAnimated = true,
    isFill = true,
) {
    const dayKey = isDay ? "day" : "night";
    const fillOrLine = isFill ? "fill" : "line";
    const animOrStatic = isAnimated ? "animated" : "static";
    const staticNameExtention = isAnimated ? "" : "wi-";

    if (!CODE_MAP[weatherCode][dayKey]) {
        console.warn(
            `[ICON]: Weather code ${weatherCode} not found in CODE_MAP. Using default.`,
        );
        return `${BASE_PATH}${fillOrLine}/${animOrStatic}/${staticNameExtention}${CODE_MAP[0][dayKey]}`;
    }

    const iconFilename = CODE_MAP[weatherCode][dayKey];

    const iconPath = `${fillOrLine}/${animOrStatic}/${staticNameExtention}${iconFilename}`;
    return `${BASE_PATH}${iconPath}`;
}

export function getWeatherCodeBackground(weatherCode, isDay) {
    const dayKey = isDay ? 1 : 0;
    return WEATHER_GRADIENTS[dayKey][weatherCode];
}

export function getWeatherCodeTextColor(weatherCode, isDay) {
    const dayKey = isDay ? 1 : 0;
    return TEXT_COLOR_MAP[dayKey][weatherCode];
}
