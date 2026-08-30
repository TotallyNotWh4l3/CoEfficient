// ===================================================
// ファイル名: 011_create_schedule_tags.js
// 作成日: 2026/08/27
// 作成者: ゴンザガ　ウェイン
// 概要: スケジュールタグテーブルを作成するマイグレーション
// ===================================================


import scheduleTagsSchema from "../database/schema/scheduleTags.js";

export default function createScheduleTagsTable(db) {
    return new Promise((resolve, reject) => {
        db.exec(scheduleTagsSchema, (error) => {
            if (error) return reject(error);
            resolve();
        });
    });
}
