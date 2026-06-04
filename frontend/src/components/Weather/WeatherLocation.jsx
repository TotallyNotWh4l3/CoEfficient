import LocationPin from "../../assets/LocationPin";
import "./weather-location.css";

export default function WeatherLocation({ location = "Tsu, Mie Pref.", pinColor = "#fff"}) {
    return (
        <div className="weather__location">
            <LocationPin className="weather__location--pin" color={pinColor}/>
            <p className="weather__location--name">{location}</p>
        </div>
    );
}
