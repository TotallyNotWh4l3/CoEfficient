import sqlite3 from "sqlite3";
import dotenv from "dotenv";

dotenv.config();

sqlite3.verbose();

const db = new sqlite3.Database(process.env.DB_PATH, (error) => {
    if (error) {
        console.error("Failed to connect to SQLite:", error.message);
        return;
    }

    console.log("Connected to SQLite database.");
});

export default db;
