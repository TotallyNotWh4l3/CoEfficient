
// ===================================================
// ファイル名: themeService.js
// 作成日: 2026/08/27
// 作成者: ゴンザガ　ウェイン
// 概要: テーマAPIサービス
// ===================================================

import apiClient from "./apiClient";

const BASE = "/themes";

const themeService = {
    getAll: () => apiClient.get(BASE).then((r) => r.data),
    create: (payload) => apiClient.post(BASE, payload).then((r) => r.data),
    update: (id, payload) => apiClient.patch(`${BASE}/${id}`, payload).then((r) => r.data),
    remove: (id) => apiClient.delete(`${BASE}/${id}`).then((r) => r.data),

    streamUrl() {
        const base = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
        const token = localStorage.getItem("co-efficient-token") || "";
        return `${base}${BASE}/stream?token=${encodeURIComponent(token)}`;
    },
};

export default themeService;
