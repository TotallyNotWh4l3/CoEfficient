const DAY_NAMES_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_NAMES_JA = ["日", "月", "火", "水", "木", "金", "土"];

function getDayLabel(dateStr, index, isJapanese) {
    if (index === 0) return isJapanese ? "今日" : "Today";
    if (index === 1) return isJapanese ? "明日" : "Tomorrow";
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return isJapanese ? `${index}日目` : `Day ${index + 1}`;
    return isJapanese ? DAY_NAMES_JA[d.getDay()] : DAY_NAMES_EN[d.getDay()];
}

function toHHMM(isoString) {
    if (!isoString) return "--:--";
    const timePart = isoString.split("T")[1];
    return timePart ? timePart.slice(0, 5) : "--:--";
}

function dateKeyOf(isoString) {
    return isoString ? isoString.split("T")[0] : "";
}

/**
 * Transforms the backend's /weather response (see weatherFormatter.js) into
 * the { current, dailyList, hourlyByDay } shape WeatherModule expects.
 *
 * @param {object} weather — response from GET /weather (formatWeather output)
 * @param {boolean} isJapanese
 */
export function mapWeatherResponse(weather, isJapanese = false) {
    if (!weather) return null;

    const { current, hourly = [], daily = [] } = weather;

    // Group hourly entries by the date they fall on, so we can:
    //  - build hourlyByDay[dayIndex] for the hourly chart
    //  - derive an average daily humidity (backend's daily data has no humidity field)
    const hourlyByDate = {};
    for (const item of hourly) {
        const key = dateKeyOf(item.time);
        if (!hourlyByDate[key]) hourlyByDate[key] = [];
        hourlyByDate[key].push(item);
    }

    const dailyList = daily.map((day, index) => {
        const hoursForDay = hourlyByDate[day.date] || [];
        const avgHumidity = hoursForDay.length
            ? Math.round(
                  hoursForDay.reduce((sum, h) => sum + (h.humidity ?? 0), 0) / hoursForDay.length,
              )
            : null;

        return {
            dayLabel: getDayLabel(day.date, index, isJapanese),
            date: day.date,
            maxTemp: day.high,
            minTemp: day.low,
            weatherCode: day.weatherCode,
            humidity: avgHumidity,
            precipChance: day.precipitation,
            precipSum: day.precipitationSum,
            windSpeed: day.windSpeed,
        };
    });

    const hourlyByDay = {};
    daily.forEach((day, index) => {
        hourlyByDay[index] = (hourlyByDate[day.date] || []).map((h) => ({
            time: toHHMM(h.time),
            temp: h.temperature,
            humidity: h.humidity,
            precipChance: h.precipitation,
            precipSum: h.precipitationSum,
            windSpeed: h.windSpeed,
            weatherCode: h.weatherCode,
        }));
    });

    const todayHigh = dailyList[0]?.maxTemp ?? current?.temperature ?? 0;
    const todayLow = dailyList[0]?.minTemp ?? current?.temperature ?? 0;
    const todayPrecipChance = dailyList[0]?.precipChance ?? 0;

    return {
        current: {
            temperature: current?.temperature ?? 0,
            humidity: current?.humidity ?? 0,
            windSpeed: current?.windSpeed ?? 0,
            precipChance: todayPrecipChance,
            weatherCode: current?.weatherCode ?? 3,
            isDay: current?.isDay ? 1 : 0,
            highTemp: todayHigh,
            lowTemp: todayLow,
            time: toHHMM(current?.time),
        },
        dailyList,
        hourlyByDay,
        locationName: weather.location?.name,
    };
}
