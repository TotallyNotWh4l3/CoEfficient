import apiClient from "./apiClient";

/**
 * Serializes all weather requests through a single queue so multiple
 * simultaneous weather modules (different locations, all on the same
 * 15-minute schedule) don't all hit the backend/Open-Meteo at once.
 * Requests still run one after another, not in parallel — this trades a
 * little latency per-request for avoiding Open-Meteo 429 rate limiting.
 */
let queue = Promise.resolve();

function enqueue(task) {
    const result = queue.then(task, task); // run task even if a prior one failed
    // Swallow errors here so one failed request doesn't break the chain for
    // requests queued after it — each caller still gets its own rejection.
    queue = result.catch(() => {});
    return result;
}

async function fetchWeatherOnce(locationId) {
    const { data } = await apiClient.get("/weather", {
        params: locationId ? { locationId } : undefined,
    });
    return data;
}

/**
 * Fetches weather for the user's saved location preference by default.
 * Pass a locationId to fetch weather for a specific location instead.
 *
 * Retries with increasing delay on failure — the backend host can be
 * asleep/cold-starting after a period of inactivity (free-tier hosting),
 * and a cold start can take 30-60s in the worst case.
 */
export function getWeather(locationId, { attempt = 0, maxAttempts = 4 } = {}) {
    return enqueue(async () => {
        try {
            return await fetchWeatherOnce(locationId);
        } catch (error) {
            if (attempt < maxAttempts - 1) {
                const delayMs = 3000 * Math.pow(2, attempt); // 3s, 6s, 12s...
                await new Promise((resolve) => setTimeout(resolve, delayMs));
                return getWeather(locationId, { attempt: attempt + 1, maxAttempts });
            }
            throw error;
        }
    });
}
