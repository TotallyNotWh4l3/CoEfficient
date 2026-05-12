import "./weather-location-module.css";

export default function WeatherLocationModule({
    location,
    pinColor = "#ff0000",
}) {
    return (
        <div className="weather-location-module">
            <div className="weather-module__location">
                <p className="weather-module__city" style={{ "--location-pin-color": pinColor }}>
                    Japan, Aichi, Nagoya
                </p>
            </div>
        </div>
    );
}
