const WeatherCurrent = ({ weather }) => {
    return (
        <section className="weather-current">
            <div className="weather-icon">☀️</div>

            <div className="weather-main">
                <h1>{weather.temperature}°C</h1>
                <p>{weather.condition}</p>
            </div>
        </section>
    );
};

export default WeatherCurrent;
