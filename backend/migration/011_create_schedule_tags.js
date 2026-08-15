import scheduleTagsSchema from "../database/schema/scheduleTags.js";

export default function createScheduleTagsTable(db) {
    return new Promise((resolve, reject) => {
        db.exec(scheduleTagsSchema, (error) => {
            if (error) return reject(error);
            resolve();
        });
    });
}
