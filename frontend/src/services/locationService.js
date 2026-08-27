
// ===================================================
// ファイル名: locationService.js
// 作成日: 2026/08/27
// 作成者: ゴンザガ　ウェイン
// 概要: ロケーションAPIサービス
// ===================================================

import apiClient from "./apiClient";

const BASE = "/locations";

const locationService = {
    getAll: () => apiClient.get(BASE).then((r) => r.data),
    create: (payload) => apiClient.post(BASE, payload).then((r) => r.data),
    update: (id, payload) => apiClient.patch(`${BASE}/${id}`, payload).then((r) => r.data),
    remove: (id) => apiClient.delete(`${BASE}/${id}`).then((r) => r.data),

    /**
     * Opens an SSE connection for real-time sync (location-created/updated/removed).
     * Same token-as-query-param pattern as scheduleService.openStream().
     */
    streamUrl() {
        const base = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
        const token = localStorage.getItem("co-efficient-token") || "";
        return `${base}/locations/stream?token=${encodeURIComponent(token)}`;
    },
};

export default locationService;
