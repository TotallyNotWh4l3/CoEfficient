// backend/models/Schedule.js
// Data-access layer for schedule items, built on the async sqlite3 helpers
// in backend/utils/dbHelpers.js.

import { run, get, all } from "../utils/dbHelpers.js";

function parseRow(row) {
    if (!row) return null;
    return {
        id: row.id,
        title: row.title,
        description: row.description,
        eventDate: row.event_date,
        eventTime: row.event_time,
        authorId: row.author_id,
        author: row.author_name,
        authorRole: row.author_role,
        isEdited: !!row.is_edited,
        isDeleted: !!row.is_deleted,
        deletedAt: row.deleted_at,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

const Schedule = {
    /** All active (non-deleted) events, soonest first. Cross-visible to everyone. */
    async listActive() {
        const rows = await all(
            `SELECT * FROM schedule_items
       WHERE is_deleted = 0
       ORDER BY event_date ASC, event_time ASC`,
        );
        return rows.map(parseRow);
    },

    /** Today's events only, sorted by time. */
    async listToday(todayIso) {
        const rows = await all(
            `SELECT * FROM schedule_items
       WHERE is_deleted = 0 AND event_date = ?
       ORDER BY event_time ASC`,
            [todayIso],
        );
        return rows.map(parseRow);
    },

    /** Events from today onward (for "upcoming events" + future "next event" module). */
    async listUpcoming(todayIso, limit = null) {
        const sql = `SELECT * FROM schedule_items
       WHERE is_deleted = 0 AND event_date >= ?
       ORDER BY event_date ASC, event_time ASC
       ${limit ? "LIMIT ?" : ""}`;
        const params = limit ? [todayIso, limit] : [todayIso];
        const rows = await all(sql, params);
        return rows.map(parseRow);
    },

    /** Anything updated after `sinceIso` — for SSE/delta sync, same pattern as Announcements. */
    async listUpdatedSince(sinceIso) {
        const rows = await all(
            `SELECT * FROM schedule_items WHERE updated_at > ? ORDER BY updated_at ASC`,
            [sinceIso],
        );
        return rows.map(parseRow);
    },

    async findById(id) {
        const row = await get(`SELECT * FROM schedule_items WHERE id = ?`, [id]);
        return parseRow(row);
    },

    async create({ title, description, eventDate, eventTime, author }) {
        const { lastID } = await run(
            `INSERT INTO schedule_items
         (title, description, event_date, event_time, author_id, author_name, author_role)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, description || null, eventDate, eventTime, author.id, author.name, author.role],
        );

        return Schedule.findById(lastID);
    },

    /** Creator or manager/admin may call this — enforced in controller via canModify. */
    async update(id, changes) {
        const before = await Schedule.findById(id);
        if (!before || before.isDeleted) return null;

        const next = {
            title: changes.title ?? before.title,
            description: changes.description ?? before.description,
            eventDate: changes.eventDate ?? before.eventDate,
            eventTime: changes.eventTime ?? before.eventTime,
        };

        await run(
            `UPDATE schedule_items
       SET title = ?, description = ?, event_date = ?, event_time = ?,
           is_edited = 1, updated_at = datetime('now')
       WHERE id = ?`,
            [next.title, next.description, next.eventDate, next.eventTime, id],
        );

        return Schedule.findById(id);
    },

    /** Soft delete — row stays for sync/audit purposes, hidden from normal views. */
    async softDelete(id) {
        const before = await Schedule.findById(id);
        if (!before || before.isDeleted) return null;

        await run(
            `UPDATE schedule_items
       SET is_deleted = 1, deleted_at = datetime('now'), updated_at = datetime('now')
       WHERE id = ?`,
            [id],
        );

        return Schedule.findById(id);
    },
};

export default Schedule;
