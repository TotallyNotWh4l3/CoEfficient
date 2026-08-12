import db from "../config/database.js";

import createUsersTable from "./001_create_users.js";
import createUserSettingsTable from "./002_create_user_settings.js";
import createLocationsTable from "./003_create_location.js";
import createWeatherDataTable from "./004_create_weather_data.js";

const migrations = [
    { name: "001_create_users", up: createUsersTable },
    { name: "002_create_user_settings", up: createUserSettingsTable },
    { name: "003_create_location", up: createLocationsTable },
    { name: "004_create_weather_data", up: createWeatherDataTable },
];

async function runMigrations() {
    for (const migration of migrations) {
        await migration.up(db);
        console.log(`[Migrate] Applied: ${migration.name}`);
    }

    console.log("[Migrate] All migrations applied.");
}

runMigrations()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("[Migrate] Failed:", error);
        process.exit(1);
    });
