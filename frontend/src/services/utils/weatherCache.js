export function getCachedWeather() {
    const cached = localStorage.getItem('weather_cache');
    if (!cached) {
        console.log("[CACHE]: Data, non-existent."); //
        return null;
    };

    try {
        const cache = JSON.parse(cached);
        // console.log("[CACHE]: Data, gotten.") // 
        return cache
    } catch (err) {
        console.error('Cache parse error: ', err); //
        console.log("[CACHE]: Data, unable to get."); //
        return null;
    }
}

export function setCachedWeather(data) {
    const cacheData = {
        data: data,
        timestamp: data.current.time
    };
    localStorage.setItem('weather_cache', JSON.stringify(cacheData));
    console.log("[CACHE]: Data, Weather Data has been set."); //
}

export function isCacheValid(maxAgeMs = 15 * 60 * 1000) {
    const cached = getCachedWeather();
    if (!cached) return false;

    const cacheTime = new Date(cached.timestamp * 1000); // Convert from seconds to milliseconds
    const age = Date.now() - cacheTime.getTime();
    const seconds = Math.floor((age / 1000) % 60);
    const minutes = Math.floor(age / (1000 * 60));
    var bool = age < maxAgeMs;
    // console.log(`[CACHE]: 
    //     Data Validity: ${bool ? "VALID" : "INVALID"} 
    //     Data      Age: ${minutes}m${seconds.toString().padStart(2, '0')}s`); //
    return bool;
}

export function clearCache() {
    localStorage.removeItem('weather_cache');
}