import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let db;

export async function initDatabase() {
    db = await open({
        filename: path.join(__dirname, "database.db"),
        driver: sqlite3.Database,
    });

    // Create table if not exists
    await db.exec(`
        CREATE TABLE IF NOT EXISTS weather_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            location_id INTEGER NOT NULL,
            timestamp INTEGER NOT NULL,
            data JSON NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    return db;
}

export default {
    get: (query, params) => db.get(query, params),
    run: (query, params) => db.run(query, params),
    all: (query, params) => db.all(query, params),
};
