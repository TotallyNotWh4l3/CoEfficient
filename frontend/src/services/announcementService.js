// frontend/src/services/announcementService.js
import apiClient from "./apiClient";

const BASE = "/announcements";

const announcementService = {
    getRecent: () => apiClient.get(`${BASE}/recent`),
    getAll: () => apiClient.get(BASE),
    getArchived: () => apiClient.get(`${BASE}/archive`),
    getSince: (sinceIso) => apiClient.get(`${BASE}/sync?since=${encodeURIComponent(sinceIso)}`),
    getLogs: (id) => apiClient.get(`${BASE}/${id}/logs`),

    create: (payload) => apiClient.post(BASE, payload),
    update: (id, payload) => apiClient.patch(`${BASE}/${id}`, payload),
    remove: (id) => apiClient.delete(`${BASE}/${id}`),
    archive: (id) => apiClient.post(`${BASE}/${id}/archive`),
    restore: (id) => apiClient.post(`${BASE}/${id}/restore`),

    /**
     * Opens an SSE connection for real-time sync (create/update/delete/archive/restore).
     * Returns an EventSource; caller is responsible for closing it (e.g. in a useEffect cleanup).
     */
    openStream(baseUrl = "") {
        return new EventSource(`${baseUrl}/api${BASE}/stream`, { withCredentials: true });
    },
};

export default announcementService;
