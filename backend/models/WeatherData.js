import db from "../config/database.js";

async function findByLocationId(locationId) {
    const result = await db.execute({
        sql: `
            SELECT *
            FROM weather_data
            WHERE location_id = ?
        `,
        args: [locationId],
    });

    const row = result.rows[0];
    if (!row) return null;

    return {
        ...row,
        payload: JSON.parse(row.payload_json),
    };
}

/**
 * Upserts the single cached row for a location — we only ever need the
 * latest cached forecast per location, not a history.
 */
async function upsert(locationId, weatherTimestamp, payload) {
    const result = await db.execute({
        sql: `
            INSERT INTO weather_data (
                location_id,
                weather_timestamp,
                payload_json,
                fetched_at
            )
            VALUES (?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(location_id) DO UPDATE SET
                weather_timestamp = excluded.weather_timestamp,
                payload_json = excluded.payload_json,
                fetched_at = CURRENT_TIMESTAMP
        `,
        args: [locationId, weatherTimestamp, JSON.stringify(payload)],
    });

    return result.rowsAffected;
}

async function deleteByLocationId(locationId) {
    const result = await db.execute({
        sql: `
            DELETE FROM weather_data
            WHERE location_id = ?
        `,
        args: [locationId],
    });

    return result.rowsAffected;
}

export default {
    findByLocationId,
    upsert,
    deleteByLocationId,
};
