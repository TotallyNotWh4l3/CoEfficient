// ===================================================
// ファイル名: database.js
// 作成日: 2026/8/27
// 作成者: ゴンザガ　ウェイン
// 概要: Tursoデータベースへの接続を管理するモジュールです。
// ===================================================

import { createClient } from "@libsql/client";
import dotenv from "dotenv";

dotenv.config();

const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

console.log("Connected to Turso database.");

/**
 * Compatibility shims for the 13 migration files in backend/migration/,
 * which are written against sqlite3's callback API and get the raw `db`
 * object passed straight through from migrate.js. Rather than rewrite all
 * 13 files, we attach exec()/run()/serialize() here that speak the same
 * callback shapes but run on top of the libSQL client underneath.
 */

// sqlite3-style db.exec(sql, callback) — multi-statement, no params.
db.exec = function (sql, callback) {
    db.executeMultiple(sql)
        .then(() => callback(null))
        .catch((error) => callback(error));
};

// sqlite3-style db.run(sql, callback) OR db.run(sql, params, callback).
// Used directly (not via dbHelpers) in migration/012, which calls it with
// just (sql, callback) — no params array.
db.run = function (sql, paramsOrCallback, maybeCallback) {
    const hasParams = typeof paramsOrCallback !== "function";
    const params = hasParams ? paramsOrCallback : [];
    const callback = hasParams ? maybeCallback : paramsOrCallback;

    db.execute({ sql, args: params })
        .then(() => callback(null))
        .catch((error) => callback(error));
};

// sqlite3-style db.serialize(fn) — our shimmed calls above are already
// independently promise-based/sequential per migration file, so this
// just needs to invoke fn() synchronously.
db.serialize = function (fn) {
    fn();
};

export default db;
