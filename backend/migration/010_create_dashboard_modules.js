import dashboardModulesSchema from "../database/schema/dashboardModules.js";

export default function createDashboardModulesTable(db) {
    return new Promise((resolve, reject) => {
        db.exec(dashboardModulesSchema, (error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });
}
