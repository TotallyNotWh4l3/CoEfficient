import Weather from "./components/Weather/Weather.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Forecast from "./components/Forecast/Forecast.jsx";

function App() {

    return (
        <div className="App">
            <Dashboard>
                <Weather />
                <Forecast />
            </Dashboard>
        </div>
    );
}

export default App;
