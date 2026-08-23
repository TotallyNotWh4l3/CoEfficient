// backend/utils/dbHelpers.js
// Thin compatibility layer over @libsql/client that preserves the
// sqlite3-style run/get/all/exec interface the models and migration/
// init scripts were written against — so callers don't need changes.

import db from "../config/database.js";

/**
 * INSERT/UPDATE/DELETE. Returns { lastID, changes } to match sqlite3's
 * `this.lastID` / `this.changes` shape used throughout the models.
 */
export async function run(sql, params = []) {
    const result = await db.execute({ sql, args: params });

    return {
        lastID:
            result.lastInsertRowid !== undefined && result.lastInsertRowid !== null
                ? Number(result.lastInsertRowid)
                : undefined,
        changes: result.rowsAffected,
    };
}

/** Single row, or undefined if no match (matches sqlite3's db.get behavior). */
export async function get(sql, params = []) {
    const result = await db.execute({ sql, args: params });
    return result.rows[0];
}

/** All matching rows as an array. */
export async function all(sql, params = []) {
    const result = await db.execute({ sql, args: params });
    return result.rows;
}

/**
 * Runs a block of raw, multi-statement SQL with no bound params — used by
 * init.js / migrate.js for schema creation (CREATE TABLE blocks, etc).
 * libSQL's equivalent of sqlite3's db.exec() is executeMultiple().
 */
export async function exec(sql) {
    await db.executeMultiple(sql);
}
