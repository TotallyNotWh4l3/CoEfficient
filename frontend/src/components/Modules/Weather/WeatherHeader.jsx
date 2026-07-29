const WeatherHeader = ({ location }) => {
    return (
        <header className="weather-header">
            <div>
                <h2>{location}</h2>
                <p>Updated just now</p>
            </div>

            <button className="weather-settings-btn">⚙️</button>
        </header>
    );
};

export default WeatherHeader;
