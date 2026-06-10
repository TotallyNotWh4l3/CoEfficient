// weatherCache.js
export async function getWeatherFromDB() {
    try {
        const response = await fetch("http://localhost:5000/api/weather/get");
        if (response.ok) {
            const data = await response.json();
            console.log("[WEATHER DB]: Data retrieved from database");
            return data;
        }
    } catch (err) {
        console.error("[WEATHER DB]: Fetch error:", err);
    }
    return null;
}

export async function saveWeatherToDB(data) {
    try {
        const response = await fetch("http://localhost:5000/api/weather/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            console.log("[WEATHER DB]: Data saved to database");
        }
    } catch (err) {
        console.error("[WEATHER DB]: Save error:", err);
    }
}

export function isWeatherValid(timestamp, maxAgeMs = 16 * 60 * 1000) {
    if (!timestamp) return false;

    const dataTime = new Date(timestamp).getTime();
    const age = Date.now() - dataTime;
    const minutes = Math.floor(age / (1000 * 60));
    const seconds = Math.floor((age / 1000) % 60);

    const isValid = age < maxAgeMs;
    console.log(
        `[WEATHER DB]: Data validity: ${isValid ? "VALID" : "STALE"} (Age: ${minutes}m${seconds.toString().padStart(2, "0")}s)`,
    );

    return isValid;
}

export function clearCache() {
    // No longer needed with database, but keep for compatibility
    console.log(
        "[WEATHER DB]: Cache clear requested (DB-based, no action needed)",
    );
}
