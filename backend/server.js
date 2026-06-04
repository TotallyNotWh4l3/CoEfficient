import express from "express";
import cors from "cors";
import db from "./database/database.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Test route with database
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend API is working!" });
});

// Example: Get data from database
app.get("/api/data", (req, res) => {
    db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
