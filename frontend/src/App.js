import Weather from "./components/Weather/Weather.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import DailyForecast from "./components/Forecast/DailyForecast.jsx";

function App() {

    return (
        <div className="App">
            <Dashboard>
                <Weather />
                <DailyForecast />
            </Dashboard>
        </div>
    );
}

export default App;
