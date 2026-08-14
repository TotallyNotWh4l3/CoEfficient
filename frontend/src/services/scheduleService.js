// frontend/src/services/scheduleService.js
import apiClient from "./apiClient";

const BASE = "/schedule";

const scheduleService = {
    getAll: () => apiClient.get(BASE).then((r) => r.data),
    getToday: () => apiClient.get(`${BASE}/today`).then((r) => r.data),
    getUpcoming: (limit) =>
        apiClient.get(`${BASE}/upcoming${limit ? `?limit=${limit}` : ""}`).then((r) => r.data),
    getSince: (sinceIso) =>
        apiClient.get(`${BASE}/sync?since=${encodeURIComponent(sinceIso)}`).then((r) => r.data),

    create: (payload) => apiClient.post(BASE, payload).then((r) => r.data),
    update: (id, payload) => apiClient.patch(`${BASE}/${id}`, payload).then((r) => r.data),
    remove: (id) => apiClient.delete(`${BASE}/${id}`).then((r) => r.data),

    /**
     * Opens an SSE connection for real-time sync (create/update/delete).
     * Same token-as-query-param workaround as announcementService.openStream().
     */
    openStream() {
        const base = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
        const token = localStorage.getItem("co-efficient-token") || "";
        return new EventSource(`${base}${BASE}/stream?token=${encodeURIComponent(token)}`);
    },
};

export default scheduleService;
