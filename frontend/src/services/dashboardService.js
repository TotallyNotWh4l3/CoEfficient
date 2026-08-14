// frontend/src/services/dashboardService.js
import apiClient from "./apiClient";

const BASE = "/dashboard";

const dashboardService = {
    getState: () => apiClient.get(BASE).then((r) => r.data),
    updateLayout: (updates) => apiClient.patch(`${BASE}/layout`, updates).then((r) => r.data),
    addModule: (type, settings) =>
        apiClient.post(`${BASE}/modules`, { type, settings }).then((r) => r.data),
    removeModule: (id) => apiClient.delete(`${BASE}/modules/${id}`).then((r) => r.data),
    updateModuleSettings: (id, key, value) =>
        apiClient.patch(`${BASE}/modules/${id}/settings`, { key, value }).then((r) => r.data),

    /** Same query-token workaround as announcementService/locationService. */
    openStream() {
        const base = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
        const token = localStorage.getItem("co-efficient-token") || "";
        return new EventSource(`${base}${BASE}/stream?token=${encodeURIComponent(token)}`);
    },
};

export default dashboardService;
