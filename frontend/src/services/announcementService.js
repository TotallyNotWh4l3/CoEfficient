// frontend/src/services/announcementService.js
import apiClient from "./apiClient";

const BASE = "/announcements";

const announcementService = {
    getRecent: () => apiClient.get(`${BASE}/recent`).then((r) => r.data),
    getAll: () => apiClient.get(BASE).then((r) => r.data),
    getArchived: () => apiClient.get(`${BASE}/archive`).then((r) => r.data),
    getSince: (sinceIso) =>
        apiClient.get(`${BASE}/sync?since=${encodeURIComponent(sinceIso)}`).then((r) => r.data),
    getLogs: (id) => apiClient.get(`${BASE}/${id}/logs`).then((r) => r.data),

    create: (payload) => apiClient.post(BASE, payload).then((r) => r.data),
    update: (id, payload) => apiClient.patch(`${BASE}/${id}`, payload).then((r) => r.data),
    remove: (id) => apiClient.delete(`${BASE}/${id}`).then((r) => r.data),
    archive: (id) => apiClient.post(`${BASE}/${id}/archive`).then((r) => r.data),
    restore: (id) => apiClient.post(`${BASE}/${id}/restore`).then((r) => r.data),
    markRead: (id) => apiClient.post(`${BASE}/${id}/read`).then((r) => r.data),
    getUnreadCount: () => apiClient.get(`${BASE}/unread-count`).then((r) => r.data),

    /**
     * Opens an SSE connection for real-time sync (create/update/delete/archive/restore).
     * Native EventSource can't send Authorization headers, so the token travels
     * as a query param instead — the backend's authenticateStream() middleware
     * expects this. Returns an EventSource; caller closes it on unmount.
     */
    openStream() {
        const base = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
        const token = localStorage.getItem("co-efficient-token") || "";
        return new EventSource(`${base}${BASE}/stream?token=${encodeURIComponent(token)}`);
    },
};

export default announcementService;
