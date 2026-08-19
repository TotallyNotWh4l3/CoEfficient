import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import geocodingRoutes from "./routes/geocodingRoutes.js";
import themeRoutes from "./routes/themeRoutes.js";


console.log("weatherRoutes loaded");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/geocoding", geocodingRoutes);
app.use("/api/themes", themeRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Co:Efficient Backend Running",
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running!`);
    console.log(`Local:   http://localhost:${PORT}`);
    console.log(`Network: http://YOUR_LOCAL_IP:${PORT}`);
});
