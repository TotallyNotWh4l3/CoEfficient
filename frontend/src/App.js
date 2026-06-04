import WeatherModule from "./components/Weather/Weather";
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