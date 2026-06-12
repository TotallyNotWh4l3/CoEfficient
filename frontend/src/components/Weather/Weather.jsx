import "./weather.css"
import CurrentWeather from "./CurrentWeather"

export default function Weather() {
    return (
        <div className="weather module">
            <div className="weather__header"></div>

            <div className="weather__body">
                <CurrentWeather />
            </div>

            <div className="weather__footer"></div>
        </div>
    )
}