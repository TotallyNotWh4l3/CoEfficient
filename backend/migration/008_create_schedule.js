import scheduleSchema from "../database/schema/schedule.js";

export default function createScheduleTable(db) {
    return new Promise((resolve, reject) => {
        db.exec(scheduleSchema, (error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });
}
