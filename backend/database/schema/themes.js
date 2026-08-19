export default `
CREATE TABLE IF NOT EXISTS themes (
    id TEXT PRIMARY KEY,

    user_id INTEGER NOT NULL,

    name TEXT NOT NULL,

    built_in INTEGER NOT NULL DEFAULT 0,
    based_on TEXT,

    appearance TEXT NOT NULL, -- JSON blob: { colors, shadows }

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;
