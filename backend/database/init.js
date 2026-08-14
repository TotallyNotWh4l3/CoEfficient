import db from "../config/database.js";

import usersTable from "./schema/users.js";
import userSettingsTable from "./schema/userSettings.js";
import locations from "./schema/locations.js";
import weatherData from "./schema/weatherData.js";
import announcements from "./schema/announcements.js";
import announcementLogs from "./schema/announcementLogs.js";
import announcementReads from "./schema/announcementReads.js";
import scheduleItems from "./schema/schedule.js";
import dashboardSettings from "./schema/dashboardSettings.js";
import dashboardModules from "./schema/dashboardModules.js";

const tables = [
    { name: "Users", sql: usersTable },
    { name: "UserSettings", sql: userSettingsTable },
    { name: "Locations", sql: locations },
    { name: "WeatherData", sql: weatherData },
    { name: "Announcements", sql: announcements },
    { name: "AnnouncementLogs", sql: announcementLogs },
    { name: "AnnouncementReads", sql: announcementReads },
    { name: "ScheduleItems", sql: scheduleItems },
    { name: "DashboardSettings", sql: dashboardSettings },
    { name: "DashboardModules", sql: dashboardModules },
];

db.serialize(() => {
    tables.forEach(({ name, sql }) => {
        db.run(sql, (error) => {
            if (error) {
                console.error(`Failed to create ${name} table:`, error.message);
            } else {
                console.log(`${name} table created.`);
            }
        });
    });
});
db.close((error) => {
    if (error) {
        console.error("Failed to close database:", error.message);
    } else {
        console.log("Database connection closed.");
    }
});
