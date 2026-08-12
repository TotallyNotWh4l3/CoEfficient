import db from "../config/database.js";

function mapRow(row) {
    if (!row) return null;

    return {
        id: row.id,
        userId: row.user_id,
        name: row.name,
        latitude: row.latitude,
        longitude: row.longitude,
        timezone: row.timezone,
        builtIn: Boolean(row.built_in),
        createdAt: row.created_at,
    };
}

function findAllByUserId(userId) {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT *
            FROM locations
            WHERE user_id = ?
            ORDER BY built_in DESC, created_at ASC
            `,
            [userId],
            (error, rows) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(rows.map(mapRow));
            },
        );
    });
}

/**
 * Locations are shared/global (one list everyone sees), not per-user —
 * user_id on the row just tracks who created it. This lists all of them.
 */
function findAll() {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT *
            FROM locations
            ORDER BY built_in DESC, created_at ASC
            `,
            [],
            (error, rows) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(rows.map(mapRow));
            },
        );
    });
}

function findById(id) {
    return new Promise((resolve, reject) => {
        db.get(
            `
            SELECT *
            FROM locations
            WHERE id = ?
            `,
            [id],
            (error, row) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(mapRow(row));
            },
        );
    });
}

/**
 * userId here means "created by" (an audit trail of who added it), not an
 * owner — the row is visible/usable by everyone once created. Only the
 * controller layer restricts *who* is allowed to call this (admin/manager).
 */
function create(location) {
    const {
        id,
        userId,
        name,
        latitude,
        longitude,
        timezone = "Asia/Tokyo",
        builtIn = false,
    } = location;

    return new Promise((resolve, reject) => {
        db.run(
            `
            INSERT INTO locations (
                id,
                user_id,
                name,
                latitude,
                longitude,
                timezone,
                built_in
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [id, userId, name, latitude, longitude, timezone, builtIn ? 1 : 0],
            function (error) {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(id);
            },
        );
    });
}

function update(id, updates) {
    const fields = [];
    const values = [];

    if (updates.name !== undefined) {
        fields.push("name = ?");
        values.push(updates.name);
    }

    if (updates.latitude !== undefined) {
        fields.push("latitude = ?");
        values.push(updates.latitude);
    }

    if (updates.longitude !== undefined) {
        fields.push("longitude = ?");
        values.push(updates.longitude);
    }

    if (updates.timezone !== undefined) {
        fields.push("timezone = ?");
        values.push(updates.timezone);
    }

    if (fields.length === 0) {
        return Promise.resolve(0);
    }

    values.push(id);

    return new Promise((resolve, reject) => {
        db.run(
            `
            UPDATE locations
            SET ${fields.join(", ")}
            WHERE id = ?
            `,
            values,
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

function deleteById(id) {
    return new Promise((resolve, reject) => {
        db.run(
            `
            DELETE FROM locations
            WHERE id = ? AND built_in = 0
            `,
            [id],
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
    findAllByUserId,
    findAll,
    findById,

    create,
    update,
    deleteById,
};
