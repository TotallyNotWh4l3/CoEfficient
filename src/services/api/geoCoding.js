export async function getLocationName(latitude, longitude) {
    try {
        const response = await fetch(
            `/api/location/reverse?latitude=${latitude}&longitude=${longitude}`,
        );
        const data = await response.json();
        // Then parse it like your original code
    } catch (error) {
        console.error("[LOCATION] Error:", error);
        return "Unknown Location";
    }
}

export async function getLocationCoordinates(locationName) {
    try {
        console.log(`[LOCATION] Forward geocoding: ${locationName}`);

        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationName)}&limit=1&language=en`,
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            throw new Error("Location not found");
        }

        const result = data.results[0];
        const latitude = result.latitude;
        const longitude = result.longitude;

        console.log(`[LOCATION] ✅ Coordinates: ${latitude}, ${longitude}`);

        return { latitude, longitude };
    } catch (error) {
        console.error("[LOCATION] ❌ Forward geocoding failed:", error);
        return null;
    }
}
