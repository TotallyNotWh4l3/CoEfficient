// ===================================================
// ファイル名: init.js
// 作成日: 2026/08/27
// 作成者: ゴンザガ　ウェイン
// 概要: データベースの初期化処理
// ===================================================


// backend/database/init.js
import { exec } from "../utils/dbHelpers.js";

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
import themes from "./schema/themes.js";

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
    { name: "Themes", sql: themes },
];

async function init() {
    for (const { name, sql } of tables) {
        try {
            await exec(sql);
            console.log(`${name} table created.`);
        } catch (error) {
            console.error(`Failed to create ${name} table:`, error.message);
        }
    }

    console.log("Database initialization complete.");
}

init().then(() => process.exit(0));

