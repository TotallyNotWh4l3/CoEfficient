const WeatherForecast = ({ forecast }) => {
    return (
        <section className="weather-forecast">
            {forecast.map((day) => (
                <div className="forecast-card" key={day.day}>
                    <p>{day.day}</p>

                    <span className="forecast-icon">{day.icon}</span>

                    <strong>{day.high}°</strong>

                    <small>{day.low}°</small>
                </div>
            ))}
        </section>
    );
};

export default WeatherForecast;
