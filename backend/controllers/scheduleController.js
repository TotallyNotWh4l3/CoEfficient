// backend/controllers/scheduleController.js
//
// NOTE: assumes req.user is set by authMiddleware.js to { id, username, role }
// (matching your JWT payload — see the note in announcementController.js about
// authorName pulling from req.user.username, not req.user.name).

import Schedule from "../models/Schedule.js";
import { broadcast, subscribe } from "../services/scheduleSyncService.js";

const isAdmin = (user) => user.role?.toLowerCase() === "admin";
const isManagerOrAbove = (user) => ["manager", "admin"].includes(user.role?.toLowerCase());

const ROLE_RANK = { user: 0, manager: 1, admin: 2 };
const canModify = (actor, event) => {
    if (!actor) return false;
    const actorRank = ROLE_RANK[actor.role?.toLowerCase()] ?? 0;
    const eventRank = ROLE_RANK[event.authorRole?.toLowerCase()] ?? 0;
    return actorRank > eventRank || event.authorId === actor.id;
};

function todayIso() {
    return new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
}

const scheduleController = {
    // GET /api/schedule -> full active list, everyone can see (cross-visible)
    async getAll(req, res) {
        try {
            res.json(await Schedule.listActive());
        } catch (err) {
            res.status(500).json({ message: "Failed to load schedule.", error: err.message });
        }
    },

    // GET /api/schedule/today -> today's events only
    async getToday(req, res) {
        try {
            res.json(await Schedule.listToday(todayIso()));
        } catch (err) {
            res.status(500).json({
                message: "Failed to load today's schedule.",
                error: err.message,
            });
        }
    },

    // GET /api/schedule/upcoming?limit=5 -> upcoming events, optional cap (used by future "next event" module)
    async getUpcoming(req, res) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
            res.json(await Schedule.listUpcoming(todayIso(), limit));
        } catch (err) {
            res.status(500).json({
                message: "Failed to load upcoming events.",
                error: err.message,
            });
        }
    },

    // GET /api/schedule/sync?since=<ISO timestamp> -> delta fetch, same pattern as Announcements
    async getSince(req, res) {
        try {
            const since = req.query.since || "1970-01-01T00:00:00.000Z";
            res.json(await Schedule.listUpdatedSince(since));
        } catch (err) {
            res.status(500).json({ message: "Failed to sync schedule.", error: err.message });
        }
    },

    // GET /api/schedule/stream -> SSE push channel
    stream(req, res) {
        subscribe(res);
    },

    // POST /api/schedule -> any authenticated user may add an event
    async create(req, res) {
        const { title, description, eventDate, eventTime } = req.body;
        if (!title?.trim() || !eventDate || !eventTime) {
            return res
                .status(400)
                .json({ message: "Title, event date, and event time are required." });
        }

        try {
            const created = await Schedule.create({
                title,
                description,
                eventDate,
                eventTime,
                author: { id: req.user.id, name: req.user.username, role: req.user.role },
            });

            broadcast("created", created);
            res.status(201).json(created);
        } catch (err) {
            res.status(500).json({ message: "Failed to create event.", error: err.message });
        }
    },

    // PATCH /api/schedule/:id -> creator or admin only
    async update(req, res) {
        try {
            const existing = await Schedule.findById(req.params.id);
            if (!existing || existing.isDeleted) {
                return res.status(404).json({ message: "Event not found." });
            }
            if (!canModify(req.user, existing)) {
                return res.status(403).json({ message: "You can only edit your own events." });
            }

            const updated = await Schedule.update(req.params.id, req.body);

            broadcast("updated", updated);
            res.json(updated);
        } catch (err) {
            res.status(500).json({ message: "Failed to update event.", error: err.message });
        }
    },

    // DELETE /api/schedule/:id -> creator or admin only (soft delete)
    async remove(req, res) {
        try {
            const existing = await Schedule.findById(req.params.id);
            if (!existing || existing.isDeleted) {
                return res.status(404).json({ message: "Event not found." });
            }
            if (!canModify(req.user, existing)) {
                return res.status(403).json({ message: "You can only delete your own events." });
            }

            const deleted = await Schedule.softDelete(req.params.id);

            broadcast("deleted", deleted);
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ message: "Failed to delete event.", error: err.message });
        }
    },
};

export default scheduleController;
