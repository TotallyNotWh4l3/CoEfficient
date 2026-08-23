import { run, get, all } from "../utils/dbHelpers.js";

const ScheduleTag = {
    async listAll() {
        return all(`SELECT * FROM schedule_tags ORDER BY created_at ASC`);
    },

    /** Upsert — same id updates the color instead of erroring. */
    async upsert(id, color) {
        const existing = await get(`SELECT id FROM schedule_tags WHERE id = ?`, [id]);
        if (existing) {
            await run(
                `UPDATE schedule_tags SET color = ?, updated_at = datetime('now') WHERE id = ?`,
                [color, id],
            );
        } else {
            await run(`INSERT INTO schedule_tags (id, color) VALUES (?, ?)`, [id, color]);
        }
        return get(`SELECT * FROM schedule_tags WHERE id = ?`, [id]);
    },

    async remove(id) {
        const { changes } = await run(`DELETE FROM schedule_tags WHERE id = ?`, [id]);
        return changes > 0;
    },
};

export default ScheduleTag;
