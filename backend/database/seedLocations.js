import Location from "../models/Location.js";
import User from "../models/User.js";

// Built-in locations everyone starts with. Add more here as needed —
// re-running this script is safe, it skips anything already present.
const DEFAULT_LOCATIONS = [
    { name: "Tokyo", latitude: 35.6762, longitude: 139.6503, timezone: "Asia/Tokyo" },
];

async function seed() {
    try {
        const admin = await User.findByUsername("admin");

        if (!admin) {
            console.error("No 'admin' user found — run the admin seed script first.");
            process.exit(1);
        }

        const existing = await Location.findAll();
        const existingNames = new Set(existing.map((loc) => loc.name));

        for (const loc of DEFAULT_LOCATIONS) {
            if (existingNames.has(loc.name)) {
                console.log(`${loc.name} already exists, skipping.`);
                continue;
            }

            const id = crypto.randomUUID();
            await Location.create({
                id,
                userId: admin.id,
                name: loc.name,
                latitude: loc.latitude,
                longitude: loc.longitude,
                timezone: loc.timezone,
                builtIn: true,
            });

            console.log(`Created built-in location: ${loc.name} (ID: ${id})`);
        }
    } catch (error) {
        console.error(error);
    }

    process.exit();
}

seed();
