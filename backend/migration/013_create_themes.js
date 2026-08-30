// ===================================================
// ファイル名: 013_create_themes.js
// 作成日: 2026/08/27
// 作成者: ゴンザガ　ウェイン
// 概要: テーマテーブルを作成するマイグレーション
// ===================================================


import themesSchema from "../database/schema/themes.js";

export default function createThemesTable(db) {
    return new Promise((resolve, reject) => {
        db.exec(themesSchema, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}
