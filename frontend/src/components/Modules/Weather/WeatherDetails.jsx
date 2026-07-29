const WeatherDetails = ({ weather }) => {
    return (
        <section className="weather-details">
            <div className="detail-card">
                <span>High</span>
                <strong>{weather.high}°</strong>
            </div>

            <div className="detail-card">
                <span>Low</span>
                <strong>{weather.low}°</strong>
            </div>

            <div className="detail-card">
                <span>Humidity</span>
                <strong>{weather.humidity}%</strong>
            </div>

            <div className="detail-card">
                <span>Wind</span>
                <strong>{weather.wind} km/h</strong>
            </div>
        </section>
    );
};

export default WeatherDetails;
