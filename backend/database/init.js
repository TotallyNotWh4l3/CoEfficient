import db from "../config/database.js";

import usersTable from "./schema/users.js";
import userSettingsTable from "./schema/userSettings.js";
import locations from "./schema/locations.js";
import weatherData from "./schema/weatherData.js";

db.serialize(() => {
    db.run(usersTable, (error) => {
        if (error) {
            console.error("Failed to create users table:", error.message);
        } else {
            console.log("Users table created.");
        }
    });

    db.run(userSettingsTable, (error) => {
        if (error) {
            console.error("Failed to create userSettings table:", error.message);
        } else {
            console.log("UserSettings table created.");
        }
    });

    db.run(locations, (error) => {
        if (error) {
            console.error("Failed to create locations table:", error.message);
        } else {
            console.log("locations table created.");
        }
    });

    db.run(weatherData, (error) => {
        if (error) {
            console.error("Failed to create weatherData table:", error.message);
        } else {
            console.log("weatherData table created.");
        }
    });
});

db.close((error) => {
    if (error) {
        console.error("Failed to close database:", error.message);
    } else {
        console.log("Database connection closed.");
    }
});
