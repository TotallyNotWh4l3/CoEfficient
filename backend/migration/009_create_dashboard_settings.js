import dashboardSettingsSchema from "../database/schema/dashboardSettings.js";

export default function createDashboardSettingsTable(db) {
    return new Promise((resolve, reject) => {
        db.exec(dashboardSettingsSchema, (error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });
}
