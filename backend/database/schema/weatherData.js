export default `
CREATE TABLE IF NOT EXISTS weather_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    location_id TEXT NOT NULL UNIQUE,

    weather_timestamp TEXT NOT NULL,

    payload_json TEXT NOT NULL,

    fetched_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(location_id) REFERENCES locations(id) ON DELETE CASCADE
);
`;