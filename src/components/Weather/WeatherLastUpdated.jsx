import "./weather-last-updated.css";

export default function WeatherLastUpdated({time}) {
    return (
        <p className="weather__time">
        <span className="weather__time--label"> Last Updated: </span>
        <span className="weather__time--value"> {time} </span>
    </p>
    )
}
