import db from "../config/database.js";

function findById(id) {
    return new Promise((resolve, reject) => {
        db.get(
            `
            SELECT *
            FROM users
            WHERE id = ?
            `,
            [id],
            (error, row) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(row);
            },
        );
    });
}

function findByUsername(username) {
    return new Promise((resolve, reject) => {
        db.get(
            `
            SELECT *
            FROM users
            WHERE username = ?
            `,
            [username],
            (error, row) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(row);
            },
        );
    });
}

function create(username, passwordHash, role = "user") {
    return new Promise((resolve, reject) => {
        db.run(
            `
            INSERT INTO users (
                username,
                password_hash,
                role
            )
            VALUES (?, ?, ?)
            `,
            [username, passwordHash, role],
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

function updateRole(id, role) {
    return new Promise((resolve, reject) => {
        db.run(
            `
            UPDATE users
            SET role = ?
            WHERE id = ?
            `,
            [role, id],
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
            DELETE FROM users
            WHERE id = ?
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
    findById,
    findByUsername,

    create,
    updateRole,
    deleteById,
};
