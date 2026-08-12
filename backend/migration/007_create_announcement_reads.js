import announcementReadsSchema from "../database/schema/announcementReads.js";

export default function createAnnouncementReadsTable(db) {
    return new Promise((resolve, reject) => {
        db.exec(announcementReadsSchema, (error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });
}
