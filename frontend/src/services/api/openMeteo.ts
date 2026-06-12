import { fetchWeatherApi } from "openmeteo";

const params = {
	latitude: 34.666166,
	longitude: 136.50195785696147,
	daily: ["weather_code", "temperature_2m_max", "temperature_2m_min", "apparent_temperature_max", "apparent_temperature_min", "sunrise", "sunset", "daylight_duration", "uv_index_max", "precipitation_sum", "precipitation_hours", "precipitation_probability_max", "wind_speed_10m_max", "wind_gusts_10m_max", "wind_direction_10m_dominant"],
	hourly: ["temperature_2m", "relative_humidity_2m", "dew_point_2m", "apparent_temperature", "precipitation_probability", "precipitation", "weather_code", "visibility", "wind_speed_10m", "wind_gusts_10m", "uv_index"],
	current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "precipitation", "weather_code", "cloud_cover", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"],
	timezone: "Asia/Tokyo",
	wind_speed_unit: "ms",
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const utcOffsetSeconds = response.utcOffsetSeconds();

console.log(
	`\nCoordinates: ${latitude}°N ${longitude}°E`,
	`\nElevation: ${elevation}m asl`,
	`\nTimezone: ${timezone} ${timezoneAbbreviation}`,
	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
);

const current = response.current()!;
const hourly = response.hourly()!;
const daily = response.daily()!;

// Define Int64 variables so they can be processed accordingly
const sunrise = daily.variables(5)!;
const sunset = daily.variables(6)!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
	current: {
		time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
		temperature_2m: current.variables(0)!.value(),
		relative_humidity_2m: current.variables(1)!.value(),
		apparent_temperature: current.variables(2)!.value(),
		is_day: current.variables(3)!.value(),
		precipitation: current.variables(4)!.value(),
		weather_code: current.variables(5)!.value(),
		cloud_cover: current.variables(6)!.value(),
		wind_speed_10m: current.variables(7)!.value(),
		wind_direction_10m: current.variables(8)!.value(),
		wind_gusts_10m: current.variables(9)!.value(),
	},
	hourly: {
		time: Array.from(
			{ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
			(_ , i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
		),
		temperature_2m: hourly.variables(0)!.valuesArray(),
		relative_humidity_2m: hourly.variables(1)!.valuesArray(),
		dew_point_2m: hourly.variables(2)!.valuesArray(),
		apparent_temperature: hourly.variables(3)!.valuesArray(),
		precipitation_probability: hourly.variables(4)!.valuesArray(),
		precipitation: hourly.variables(5)!.valuesArray(),
		weather_code: hourly.variables(6)!.valuesArray(),
		visibility: hourly.variables(7)!.valuesArray(),
		wind_speed_10m: hourly.variables(8)!.valuesArray(),
		wind_gusts_10m: hourly.variables(9)!.valuesArray(),
		uv_index: hourly.variables(10)!.valuesArray(),
	},
	daily: {
		time: Array.from(
			{ length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() }, 
			(_ , i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
		),
		weather_code: daily.variables(0)!.valuesArray(),
		temperature_2m_max: daily.variables(1)!.valuesArray(),
		temperature_2m_min: daily.variables(2)!.valuesArray(),
		apparent_temperature_max: daily.variables(3)!.valuesArray(),
		apparent_temperature_min: daily.variables(4)!.valuesArray(),
		// Map Int64 values to according structure
		sunrise: [...Array(sunrise.valuesInt64Length())].map(
			(_ , i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
		),
		// Map Int64 values to according structure
		sunset: [...Array(sunset.valuesInt64Length())].map(
			(_ , i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
		),
		daylight_duration: daily.variables(7)!.valuesArray(),
		uv_index_max: daily.variables(8)!.valuesArray(),
		precipitation_sum: daily.variables(9)!.valuesArray(),
		precipitation_hours: daily.variables(10)!.valuesArray(),
		precipitation_probability_max: daily.variables(11)!.valuesArray(),
		wind_speed_10m_max: daily.variables(12)!.valuesArray(),
		wind_gusts_10m_max: daily.variables(13)!.valuesArray(),
		wind_direction_10m_dominant: daily.variables(14)!.valuesArray(),
	},
};

export default function getWeatherData(): typeof weatherData {
	return weatherData;
}
