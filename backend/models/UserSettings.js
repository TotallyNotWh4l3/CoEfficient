import db from "../config/database.js";

function findByUserId(userId) {
    return new Promise((resolve, reject) => {
        db.get(
            `
            SELECT *
            FROM user_settings
            WHERE user_id = ?
            `,
            [userId],
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
                    settings: JSON.parse(row.settings_json),
                });
            },
        );
    });
}

function create(userId, settings) {
    return new Promise((resolve, reject) => {
        db.run(
            `
            INSERT INTO user_settings (
                user_id,
                settings_json
            )
            VALUES (?, ?)
            `,
            [userId, JSON.stringify(settings)],
            function (error) {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(this.lastID);
            },
        );
    });
}

function updateByUserId(userId, settings) {
    return new Promise((resolve, reject) => {
        db.run(
            `
            UPDATE user_settings
            SET
                settings_json = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE
                user_id = ?
            `,
            [JSON.stringify(settings), userId],
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

function deleteByUserId(userId) {
    return new Promise((resolve, reject) => {
        db.run(
            `
            DELETE FROM user_settings
            WHERE user_id = ?
            `,
            [userId],
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

async function upsert(userId, settings) {
    const existing = await findByUserId(userId);

    if (existing) {
        return updateByUserId(userId, settings);
    }

    return create(userId, settings);
}

export default {
    findByUserId,

    create,
    updateByUserId,
    deleteByUserId,

    upsert,
};
