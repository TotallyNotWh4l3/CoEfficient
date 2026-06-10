export function CurrentWeather(datas) {
    const cur = datas ? datas.current : null;
    var dateObject = new Date(cur.time * 1000);
    var hour = dateObject.getHours().toString();
    var minute = dateObject.getMinutes().toString();
    var time = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
    const data = {
        time: cur ? time : null,
        temperature: cur ? Math.round(cur.temperature_2m) : null,
        humidity: cur ? Math.round(cur.relative_humidity_2m) : null,
        feelsLike: cur ? Math.round(cur.apparent_temperature_2m) : null,
        windSpeed: cur ? Math.round(cur.wind_speed_10m) : null,
        windGust: cur ? Math.round(cur.wind_gusts_10m) : null,
        weatherCode: cur ? cur.weather_code : null,
        precipitation: cur ? Math.round(cur.precipitation) : null,
        isDay: cur ? cur.is_day : null,
    };
    return data;
}

export function DailyWeather(datas) {
    const dailyWeather = datas ? datas.daily : null;
    const data = {
        time: dailyWeather ? dailyWeather.time : null,
        weatherCode: dailyWeather ? dailyWeather.weather_code : null,
        tempMax: dailyWeather
            ? dailyWeather.temperature_2m_max.map(Math.round)
            : null,
        tempMin: dailyWeather
            ? dailyWeather.temperature_2m_min.map(Math.round)
            : null,
        feelsLikeMax: dailyWeather
            ? dailyWeather.apparent_temperature_max.map(Math.round)
            : null,
        feelsLikeMin: dailyWeather
            ? dailyWeather.apparent_temperature_min.map(Math.round)
            : null,
        sunrise: dailyWeather ? dailyWeather.sunrise : null,
        sunset: dailyWeather ? dailyWeather.sunset : null,
        daylightDuration: dailyWeather ? dailyWeather.daylight_duration : null,
        uvIndexMax: dailyWeather ? dailyWeather.uv_index_max : null,
        precipitationSum: dailyWeather
            ? dailyWeather.precipitation_sum.map(Math.round)    
            : null,
        precipitationProbabilityMax: dailyWeather
            ? dailyWeather.precipitation_probability_max.map(Math.round)
            : null,
        precipitationHours: dailyWeather
            ? dailyWeather.precipitation_hours.map(Math.round)
            : null,
        windSpeedMax: dailyWeather
            ? dailyWeather.wind_speed_10m_max.map(Math.round)
            : null,
        windDirectionDominant: dailyWeather
            ? dailyWeather.wind_direction_10m_dominant
            : null,
        windGustMax: dailyWeather
            ? dailyWeather.wind_gusts_10m_max.map(Math.round)
            : null,
    };
    return data;
}

function seperateHourlyData(dataset, dataName = "Unknown") {
    var table = [];
    for (let i = 0; i < 7; i++) {
        var subTable = [];
        for (let j = 0; j < 25; j++) {
            var value = dataset[j + i * 24];
            if (value === undefined) {
                console.warn(
                    `Data Missing, Index ${j + i * 24} \n Dataset: ${dataName}`,
                );
                value = null;
            }
            subTable.push(value);
        }
        table.push(subTable);
    }
    return table;
}

export function HourlyWeather(datas) {
    const hourlyWeather = datas ? datas.hourly : null;
    const data = {
        time: hourlyWeather
            ? seperateHourlyData(hourlyWeather.time, "Time")
            : null,
        temperature: hourlyWeather
            ? seperateHourlyData(hourlyWeather.temperature_2m, "Temperature")
            : null,
        humidity: hourlyWeather
            ? seperateHourlyData(hourlyWeather.relative_humidity_2m, "Humidity")
            : null,
        dewPoint: hourlyWeather
            ? seperateHourlyData(hourlyWeather.dew_point_2m, "Dew Point")
            : null,
        weatherCode: hourlyWeather
            ? seperateHourlyData(hourlyWeather.weather_code, "Weather Code")
            : null,
        precipitationProbability: hourlyWeather
            ? seperateHourlyData(
                  hourlyWeather.precipitation_probability,
                  "Precipitation Probability",
              )
            : null,
        precipitation: hourlyWeather
            ? seperateHourlyData(hourlyWeather.precipitation, "Precipitation")
            : null,
        windSpeed: hourlyWeather
            ? seperateHourlyData(hourlyWeather.wind_speed_10m, "Wind Speed")
            : null,
    };
    return data;
}

// weatherCompile.js or weatherUtils.js

export function DailyForecastCompiled(data) {
    if (!data || !data.time) {
        console.warn("[FORECAST] No daily data available");
        return [];
    }

    const forecastArray = data.time.map((timestamp, index) => ({
        id: index,
        date: new Date(timestamp * 1000),
        timestamp: timestamp,

        // Temperature
        tempMax: data.tempMax[index],
        tempMin: data.tempMin[index],
        feelsLikeMax: data.feelsLikeMax[index],
        feelsLikeMin: data.feelsLikeMin[index],

        // Weather
        weatherCode: data.weatherCode[index],

        // Precipitation
        precipitationSum: data.precipitationSum[index],
        precipitationProbabilityMax: data.precipitationProbabilityMax[index],
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
    }));

    return forecastArray;
}
