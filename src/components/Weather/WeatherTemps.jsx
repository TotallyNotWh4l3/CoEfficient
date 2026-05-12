import "./weather-temps.css"

export default function WeatherTemps({
    currentTemp = "25", 
    maxTemp = "30", 
    minTemp = "20", 
    unitTemp = "°C"
} = {}) {
    return (
        <div className="weather__stat--temperature">
            <div className="weather__measurement">
                <span className="weather__value" id="weatherCurrentTemp">
                    {currentTemp}
                </span>
                <span className="weather__unit">{unitTemp}</span>
            </div>
            <div className="weather__range">
                <div className="weather__measurement">
                    <span className="weather__label">H:</span>
                    <span className="weather__value">
                        {maxTemp}
                    </span>
                    <span className="weather__unit">{unitTemp}</span>
                </div>
                <div className="weather__measurement">
                    <span className="weather__label">L:</span>
                    <span className="weather__value">
                        {minTemp}
                    </span>
                    <span className="weather__unit">{unitTemp}</span>
                </div>
            </div>
        </div>
    );
}
