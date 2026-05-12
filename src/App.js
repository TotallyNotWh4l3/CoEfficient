import WeatherModule from "./components/Weather/WeatherModule";
import DashboardModule from "./components/Dashboard/DashboardModule";

function App() {
    return (
        <div className="App">
            <DashboardModule>
                <WeatherModule />
            </DashboardModule>
        </div>
    );
}

export default App;