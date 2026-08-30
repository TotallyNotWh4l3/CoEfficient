// ===================================================
// ファイル名: dashboardController.js
// 作成日: 2026/08/27
// 作成者: ゴンザガ　ウェイン
// 概要: ダッシュボードの管理を行うAPIコントローラー。ユーザーのダッシュボード状態の取得、モジュールの追加・削除・設定更新などの機能を提供します。
// ===================================================


// backend/controllers/dashboardController.js
import Dashboard from "../models/Dashboard.js";
import { broadcast, subscribe } from "../services/dashboardSyncService.js";

const dashboardController = {
    // GET /api/dashboard -> this user's own dashboard, auto-provisioned on first access
    async getState(req, res) {
        try {
            await Dashboard.ensureSeeded(req.user.id);
            res.json(await Dashboard.getState(req.user.id));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to load dashboard." });
        }
    },

    // GET /api/dashboard/stream -> SSE push channel, scoped to this user only
    stream(req, res) {
        subscribe(req.user.id, res);
    },

    // PATCH /api/dashboard/layout
    async updateLayout(req, res) {
        try {
            const state = await Dashboard.updateLayout(req.user.id, req.body);
            broadcast(req.user.id, "layout-updated", state.layout);
            res.json(state);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to update layout." });
        }
    },

    // POST /api/dashboard/modules
    async addModule(req, res) {
        const { type, settings } = req.body;
        if (!type) {
            return res.status(400).json({ message: "Module type is required." });
        }
        try {
            const module = await Dashboard.addModule(req.user.id, type, settings);
            broadcast(req.user.id, "module-added", module);
            res.status(201).json(module);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to add module." });
        }
    },

    // DELETE /api/dashboard/modules/:id
    async removeModule(req, res) {
        try {
            const removed = await Dashboard.removeModule(req.user.id, req.params.id);
            if (!removed) return res.status(404).json({ message: "Module not found." });

            broadcast(req.user.id, "module-removed", { id: req.params.id });
            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to remove module." });
        }
    },

    // PATCH /api/dashboard/modules/:id/settings
    async updateModuleSettings(req, res) {
        const { key, value } = req.body;
        if (!key) {
            return res.status(400).json({ message: "A settings key is required." });
        }
        try {
            const module = await Dashboard.updateModuleSettings(req.user.id, req.params.id, key, value);
            if (!module) return res.status(404).json({ message: "Module not found." });

            broadcast(req.user.id, "module-updated", module);
            res.json(module);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to update module settings." });
        }
    },
};

export default dashboardController;
