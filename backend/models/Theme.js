import db from "../config/database.js";

function mapRow(row) {
    if (!row) return null;

    return {
        id: row.id,
        userId: row.user_id,
        name: row.name,
        builtIn: Boolean(row.built_in),
        basedOn: row.based_on,
        appearance: JSON.parse(row.appearance),
        createdAt: row.created_at,
    };
}

function findAll() {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT *
            FROM themes
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
            FROM themes
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

function create(theme) {
    const { id, userId, name, builtIn = false, basedOn = null, appearance } = theme;

    return new Promise((resolve, reject) => {
        db.run(
            `
            INSERT INTO themes (
                id,
                user_id,
                name,
                built_in,
                based_on,
                appearance
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [id, userId, name, builtIn ? 1 : 0, basedOn, JSON.stringify(appearance)],
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

    if (updates.appearance !== undefined) {
        fields.push("appearance = ?");
        values.push(JSON.stringify(updates.appearance));
    }

    if (fields.length === 0) {
        return Promise.resolve(0);
    }

    values.push(id);

    return new Promise((resolve, reject) => {
        db.run(
            `
            UPDATE themes
            SET ${fields.join(", ")}
            WHERE id = ? AND built_in = 0
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
            DELETE FROM themes
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
    findAll,
    findById,
    create,
    update,
    deleteById,
};
