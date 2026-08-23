// 005_create_announcements.js
import announcementsSchema from "../database/schema/announcements.js";

export default function createAnnouncementsTable(db) {
    return new Promise((resolve, reject) => {
        db.exec(announcementsSchema, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}