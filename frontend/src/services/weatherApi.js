import apiClient from "./apiClient";

/**
 * Fetches weather for the user's saved location preference by default.
 * Pass a locationId to fetch weather for a specific location instead —
 * used when the user switches locations in the UI, so we don't have to
 * wait on the settings auto-save round-trip before showing new weather.
 */
export async function getWeather(locationId) {
    const { data } = await apiClient.get("/weather", {
        params: locationId ? { locationId } : undefined,
    });
    return data;
}
