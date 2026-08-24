import apiClient from "./apiClient";

/**
 * Fetches weather for the user's saved location preference by default.
 * Pass a locationId to fetch weather for a specific location instead —
 * used when the user switches locations in the UI, so we don't have to
 * wait on the settings auto-save round-trip before showing new weather.
 *
 * Retries once after a short delay on failure — the backend host can be
 * asleep/cold-starting on the first request after a period of inactivity,
 * which produces a transient network-level failure (not a real API error).
 * A short retry absorbs that without surfacing an error to the user.
 */
export async function getWeather(locationId, { retries = 1, retryDelayMs = 2500 } = {}) {
    try {
        const { data } = await apiClient.get("/weather", {
            params: locationId ? { locationId } : undefined,
        });
        return data;
    } catch (error) {
        if (retries > 0) {
            await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
            return getWeather(locationId, { retries: retries - 1, retryDelayMs });
        }
        throw error;
    }
}
