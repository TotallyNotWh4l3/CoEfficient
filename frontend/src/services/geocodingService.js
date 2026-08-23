// frontend/src/services/geocodingService.js
import apiClient from "./apiClient";

const geocodingService = {
    search: (query) =>
        apiClient.get(`/geocoding/search?q=${encodeURIComponent(query)}`).then((r) => r.data),

    reverse: (latitude, longitude) =>
        apiClient.get(`/geocoding/reverse?lat=${latitude}&lon=${longitude}`).then((r) => r.data),
};

export default geocodingService;
