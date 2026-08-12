import usersSchema from "../database/schema/users.js";

export default function createUsersTable(db) {
    return new Promise((resolve, reject) => {
        db.exec(usersSchema, (error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });
}