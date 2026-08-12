import userSettingsSchema from "../database/schema/userSettings.js";

export default function createUserSettingsTable(db) {
    return new Promise((resolve, reject) => {
        db.exec(userSettingsSchema, (error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });
}