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

function findById(id, userId) {
    return new Promise((resolve, reject) => {
        db.get(
            `
            SELECT *
            FROM locations
            WHERE id = ? AND user_id = ?
            `,
            [id, userId],
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

function update(id, userId, updates) {
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

    values.push(id, userId);

    return new Promise((resolve, reject) => {
        db.run(
            `
            UPDATE locations
            SET ${fields.join(", ")}
            WHERE id = ? AND user_id = ?
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

function deleteById(id, userId) {
    return new Promise((resolve, reject) => {
        db.run(
            `
            DELETE FROM locations
            WHERE id = ? AND user_id = ? AND built_in = 0
            `,
            [id, userId],
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
    findById,

    create,
    update,
    deleteById,
};
