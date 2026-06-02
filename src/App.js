import WeatherModule from "./components/Weather/Weather.jsx";
import DashboardModule from "./components/Dashboard/DashboardModule.jsx";


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