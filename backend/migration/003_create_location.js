// 003_create_location.js
import locationsSchema from "../database/schema/locations.js";

export default function createLocationsTable(db) {
    return new Promise((resolve, reject) => {
        db.exec(locationsSchema, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}