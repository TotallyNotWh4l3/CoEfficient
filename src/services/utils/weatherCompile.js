export function CurrentWeather(datas) {
    const currentWeather = datas ? datas.current : null;
    const data = {
        time: currentWeather ? currentWeather.time : null,
        temperature: currentWeather ? currentWeather.temperature_2m : null,
        humidity: currentWeather ? currentWeather.relative_humidity_2m : null,
        feelsLike: currentWeather ? currentWeather.apparent_temperature_2m : null,
        windSpeed: currentWeather ? currentWeather.wind_speed_10m : null,
        windGust: currentWeather ? currentWeather.wind_gusts_10m : null,
        weatherCode: currentWeather ? currentWeather.weather_code : null,
        precipitation: currentWeather ? currentWeather.precipitation : null,
        isDay: currentWeather ? currentWeather.is_day : null
    };
    return data;
}

export function DailyWeather(datas) {
    const dailyWeather = datas ? datas.daily : null;
    const data = {
        time: dailyWeather ? dailyWeather.time : null,
        weatherCode: dailyWeather ? dailyWeather.weather_code : null,
        tempMax: dailyWeather ? dailyWeather.temperature_2m_max : null,
        tempMin: dailyWeather ? dailyWeather.temperature_2m_min : null,
        feelsLikeMax: dailyWeather ? dailyWeather.apparent_temperature_max : null,
        feelsLikeMin: dailyWeather ? dailyWeather.apparent_temperature_min : null,
        sunrise: dailyWeather ? dailyWeather.sunrise : null,
        sunset: dailyWeather ? dailyWeather.sunset : null,
        daylightDuration: dailyWeather ? dailyWeather.daylight_duration : null,
        uvIndexMax: dailyWeather ? dailyWeather.uv_index_max : null,
        precipitationSum: dailyWeather ? dailyWeather.precipitation_sum : null,
        precipitationProbabilityMax: dailyWeather ? dailyWeather.precipitation_probability_max : null,
        precipitationHours: dailyWeather ? dailyWeather.precipitation_hours : null,
        windSpeedMax: dailyWeather ? dailyWeather.wind_speed_10m_max : null,
        windDirectionDominant: dailyWeather ? dailyWeather.wind_direction_10m_dominant : null,
        windGustMax: dailyWeather ? dailyWeather.wind_gusts_10m_max : null
    }
    return data;
}

function seperateHourlyData(dataset, dataName = 'Unknown') {
    var table = []
    for (let i = 0; i < 7; i++) {
        var subTable = [];
        for (let j = 0; j < 25; j++) {
            var value = dataset[j + i * 24];
            if (value === undefined) {
                console.warn(`Data Missing, Index ${j + i * 24} \n Dataset: ${dataName}`);
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
        time: hourlyWeather ? seperateHourlyData(hourlyWeather.time, 'Time') : null,
        temperature: hourlyWeather ? seperateHourlyData(hourlyWeather.temperature_2m, 'Temperature') : null,
        humidity: hourlyWeather ? seperateHourlyData(hourlyWeather.relative_humidity_2m, 'Humidity') : null,
        dewPoint: hourlyWeather ? seperateHourlyData(hourlyWeather.dew_point_2m, 'Dew Point') : null,
        weatherCode: hourlyWeather ? seperateHourlyData(hourlyWeather.weather_code, 'Weather Code') : null,
        precipitationProbability: hourlyWeather ? seperateHourlyData(hourlyWeather.precipitation_probability, 'Precipitation Probability') : null,
        precipitation: hourlyWeather ? seperateHourlyData(hourlyWeather.precipitation, 'Precipitation') : null,
        windSpeed: hourlyWeather ? seperateHourlyData(hourlyWeather.wind_speed_10m, 'Wind Speed') : null
    }
    return data;
}