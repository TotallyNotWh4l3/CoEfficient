import { useEffect } from "react";

import WeatherModule from "./components/Weather/Weather.jsx";
import DashboardModule from "./components/Dashboard/DashboardModule.jsx";

function App() {
    useEffect(() => {
        fetch("http://localhost:3001/api/test")
            .then((res) => res.json())
            .then((data) => console.log("Backend response:", data))
            .catch((err) => console.error("Backend error:", err));
    }, []);
    return (
        <div className="App">
            <DashboardModule>
                <WeatherModule />
            </DashboardModule>
        </div>
    );
}

export default App;
