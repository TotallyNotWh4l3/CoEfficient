export function CurrentWeather(datas) {
    const cur = datas ? datas.current : null;

    if (!cur) return null;

    var dateOBJ = new Date(cur.time);
    var formattedTime = `${dateOBJ.getHours().toString().padStart(2, "0")}:${dateOBJ.getMinutes().toString().padStart(2, "0")}`;
    const data = {
        time: formattedTime,
        rawTime: dateOBJ,
        temperature: Math.round(cur.temperature_2m),
        humidity: Math.round(cur.relative_humidity_2m),
        feelsLike: Math.round(cur.apparent_temperature),
        windSpeed: Math.round(cur.wind_speed_10m),
        windGust: Math.round(cur.wind_gusts_10m),
        weatherCode: cur.weather_code,
        precipitation: Math.round(cur.precipitation * 10) / 10,
        isDay: cur.is_day,
    };
    return data;
}

export function DailyWeather(datas) {
    const dailyWeather = datas ? datas.daily : null;

    if (!dailyWeather) return null;

    const data = {
        time: dailyWeather.time,
        weatherCode: dailyWeather.weather_code,
        tempMax: dailyWeather.temperature_2m_max.map((v) => Math.round(v)),
        tempMin: dailyWeather.temperature_2m_min.map((v) => Math.round(v)),
        feelsLikeMax: dailyWeather.apparent_temperature_max.map((v) =>
            Math.round(v),
        ),
        feelsLikeMin: dailyWeather.apparent_temperature_min.map((v) =>
            Math.round(v),
        ),
        sunrise: dailyWeather.sunrise,
        sunset: dailyWeather.sunset,
        daylightDuration: dailyWeather.daylight_duration.map((v) =>
            Math.round(v),
        ),
        uvIndexMax: dailyWeather.uv_index_max.map(
            (v) => Math.round(v * 10) / 10,
        ),
        precipitationSum: dailyWeather.precipitation_sum.map(
            (v) => Math.round(v * 10) / 10,
        ),
        precipitationProbabilityMax:
            dailyWeather.precipitation_probability_max.map((v) =>
                Math.round(v),
            ),
        precipitationHours: dailyWeather.precipitation_hours.map((v) =>
            Math.round(v),
        ),
        windSpeedMax: dailyWeather.wind_speed_10m_max.map((v) => Math.round(v)),
        windDirectionDominant: dailyWeather.wind_direction_10m_dominant.map(
            (v) => Math.round(v),
        ),
        windGustMax: dailyWeather.wind_gusts_10m_max.map((v) => Math.round(v)),
    };
    return data;
}

function seperateHourlyData(dataset, dataName = "Unknown") {
    if (!Array.isArray(dataset)) {
        console.warn(`Data is not an array. Dataset: ${dataName}`);
        return null;
    }

    const table = [];
    for (let i = 0; i < 7; i++) {
        const subTable = [];
        for (let j = 0; j < 25; j++) {
            const value = dataset[j + i * 24];
            if (value === undefined) {
                console.warn(
                    `Data Missing, Index ${j + i * 24} \n Dataset: ${dataName}`,
                );
            }
            subTable.push(value ?? null);
        }
        table.push(subTable);
    }
    return table;
}

export function HourlyWeather(datas) {
    const hourlyWeather = datas ? datas.hourly : null;

    if (!hourlyWeather) return null;

    const data = {
        time: seperateHourlyData(hourlyWeather.time, "Time"),
        temperature: seperateHourlyData(
            hourlyWeather.temperature_2m,
            "Temperature",
        ),
        humidity: seperateHourlyData(
            hourlyWeather.relative_humidity_2m,
            "Humidity",
        ),
        dewPoint: seperateHourlyData(hourlyWeather.dew_point_2m, "Dew Point"),
        weatherCode: seperateHourlyData(
            hourlyWeather.weather_code,
            "Weather Code",
        ),
        precipitationProbability: seperateHourlyData(
            hourlyWeather.precipitation_probability,
            "Precipitation Probability",
        ),
        precipitation: seperateHourlyData(
            hourlyWeather.precipitation,
            "Precipitation",
        ),
        windSpeed: seperateHourlyData(
            hourlyWeather.wind_speed_10m,
            "Wind Speed",
        ),
    };
    return data;
}

export function DailyForecastCompiled(data) {
    if (!data || !data.time) {
        console.warn("[FORECAST] No daily data available");
        return [];
    }

    const forecastArray = data.time.map((timestamp, index) => {
        const dateObj = new Date(timestamp);

        return {
            id: index,
            date: dateObj,
            timestamp: dateObj.getTime(),

            // Temperature
            tempMax: data.tempMax[index],
            tempMin: data.tempMin[index],
            feelsLikeMax: data.feelsLikeMax[index],
            feelsLikeMin: data.feelsLikeMin[index],

            // Weather
            weatherCode: data.weatherCode[index],

            // Precipitation
            precipitationSum: data.precipitationSum[index],
            precipitationProbabilityMax:
                data.precipitationProbabilityMax[index],
            precipitationHours: data.precipitationHours[index],

            // Wind
            windSpeedMax: data.windSpeedMax[index],
            windGustMax: data.windGustMax[index],
            windDirectionDominant: data.windDirectionDominant[index],

            // UV
            uvIndexMax: data.uvIndexMax[index],

            // Sun
            sunrise: data.sunrise[index],
            sunset: data.sunset[index],
            daylightDuration: data.daylightDuration[index],
        };
    });

    return forecastArray;
}
