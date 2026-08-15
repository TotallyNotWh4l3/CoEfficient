export default function addScheduleSubtitleAndTags(db) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`ALTER TABLE schedule_items ADD COLUMN subtitle TEXT`, (err) => {
                // SQLite throws if the column already exists — ignore that specific case
                // so re-running migrations doesn't crash.
                if (err && !/duplicate column/i.test(err.message)) return reject(err);
            });
            db.run(
                `ALTER TABLE schedule_items ADD COLUMN tags TEXT NOT NULL DEFAULT '[]'`,
                (err) => {
                    if (err && !/duplicate column/i.test(err.message)) return reject(err);
                    resolve();
                },
            );
        });
    });
}
