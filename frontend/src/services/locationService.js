// frontend/src/services/locationService.js
import apiClient from "./apiClient";

const BASE = "/locations";

const locationService = {
    getAll: () => apiClient.get(BASE).then((r) => r.data),
    create: (payload) => apiClient.post(BASE, payload).then((r) => r.data),
    update: (id, payload) => apiClient.patch(`${BASE}/${id}`, payload).then((r) => r.data),
    remove: (id) => apiClient.delete(`${BASE}/${id}`).then((r) => r.data),
};

export default locationService;