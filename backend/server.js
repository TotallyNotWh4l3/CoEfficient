import express from "express";
import weatherRouter from "./routes/weather.js";
import { initDatabase } from "./database/database.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize database
await initDatabase();

app.use(express.json());

// Routes
app.use("/api/weather", weatherRouter);

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
