export default `
CREATE TABLE IF NOT EXISTS announcement_reads (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  announcement_id   INTEGER NOT NULL,
  user_id           INTEGER NOT NULL,
  read_at           TEXT NOT NULL DEFAULT (datetime('now')),

  UNIQUE(announcement_id, user_id),
  FOREIGN KEY (announcement_id) REFERENCES announcements(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_announcement_reads_user
  ON announcement_reads (user_id);
`;
