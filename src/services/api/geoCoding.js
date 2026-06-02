export async function getLocationName(latitude, longitude) {
    try {
        console.log(`[LOCATION] Reverse geocoding: ${latitude}, ${longitude}`)
        
        const response = await fetch(
            `/api/location/reverse?latitude=${latitude}&longitude=${longitude}`
        )
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`)
        }
        
        const data = await response.json()
        const address = data.address
        
        const city = address.city || address.town || address.village
        const division = address.state || address.province || address.county || address.region
        
        const locationName = (city && division && city !== division)
            ? `${city}, ${division}`
            : city || address.country || "Unknown"
        
        console.log(`[LOCATION] Location: ${locationName}`)
        return locationName
        
    } catch (error) {
        console.error("[LOCATION] Reverse geocoding failed:", error)
        return "Unknown Location"
    }
}

export async function getLocationCoordinates(locationName) {
    try {
        console.log(`[LOCATION] Forward geocoding: ${locationName}`)

        const response = await fetch(
            `/api/location/search?locationName=${encodeURIComponent(locationName)}`
        )

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()

        if (data.length === 0) {
            throw new Error("Location not found")
        }

        const result = data[0]
        const latitude = parseFloat(result.lat)
        const longitude = parseFloat(result.lon)

        console.log(`[LOCATION] ✅ Coordinates: ${latitude}, ${longitude}`)

        return { latitude, longitude }

    } catch (error) {
        console.error("[LOCATION] ❌ Forward geocoding failed:", error)
        return null
    }
}