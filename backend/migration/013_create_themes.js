import themesSchema from "../database/schema/themes.js";

export default function createThemesTable(db) {
    return new Promise((resolve, reject) => {
        db.exec(themesSchema, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}
