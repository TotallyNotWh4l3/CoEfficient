import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Weather from "./components/Weather/Weather.jsx";
function App() {
    return (
        <div className="App">
            <Dashboard>
                <Weather />
            </Dashboard>
        </div>
    );
}

export default App;
