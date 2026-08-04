import announcementLogsSchema from "../database/schema/announcementLogs.js";

export default function createAnnouncementLogsTable(db) {
    return new Promise((resolve, reject) => {
        db.exec(announcementLogsSchema, (error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });
}
