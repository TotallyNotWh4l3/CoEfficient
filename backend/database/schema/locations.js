export default `
CREATE TABLE IF NOT EXISTS locations (
    id TEXT PRIMARY KEY,

    user_id INTEGER NOT NULL,

    name TEXT NOT NULL,

    latitude REAL NOT NULL,
    longitude REAL NOT NULL,

    timezone TEXT NOT NULL DEFAULT 'Asia/Tokyo',

    built_in INTEGER NOT NULL DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;