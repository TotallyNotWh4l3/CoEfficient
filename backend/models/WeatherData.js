import db from "../config/database.js";

function findByLocationId(locationId) {
    return new Promise((resolve, reject) => {
        db.get(
            `
            SELECT *
            FROM weather_data
            WHERE location_id = ?
            `,
            [locationId],
            (error, row) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (!row) {
                    resolve(null);
                    return;
                }

                resolve({
                    ...row,
                    payload: JSON.parse(row.payload_json),
                });
            },
        );
    });
}

/**
 * Upserts the single cached row for a location — we only ever need the
 * latest cached forecast per location, not a history.
 */
function upsert(locationId, weatherTimestamp, payload) {
    return new Promise((resolve, reject) => {
        db.run(
            `
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
            [locationId, weatherTimestamp, JSON.stringify(payload)],
            function (error) {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(this.changes);
            },
        );
    });
}

function deleteByLocationId(locationId) {
    return new Promise((resolve, reject) => {
        db.run(
            `
            DELETE FROM weather_data
            WHERE location_id = ?
            `,
            [locationId],
            function (error) {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(this.changes);
            },
        );
    });
}

export default {
    findByLocationId,
    upsert,
    deleteByLocationId,
};
