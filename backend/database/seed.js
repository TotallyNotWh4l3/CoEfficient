import User from "../models/User.js";
import Password from "../utils/password.js";

const USERS_TO_SEED = [
    { username: "Administrator", password: "imwhale1123", role: "admin" },

    { username: "Red Manager", password: "crimson", role: "manager" },
    { username: "Blue Manager", password: "cobalt", role: "manager" },

    { username: "Barrack Obama", password: "password123", role: "user" },
    { username: "Donald Trump", password: "password123", role: "user" },
    { username: "Joe Biden", password: "password123", role: "user" },
    { username: "Bill Clinton", password: "password123", role: "user" },
    { username: "George W. Bush", password: "password123", role: "user" },
];

async function seed() {
    try {
        for (const { username, password, role } of USERS_TO_SEED) {
            const existingUser = await User.findByUsername(username);

            if (existingUser) {
                console.log(`${username} already exists, skipping.`);
                continue;
            }

            const passwordHash = await Password.hashPassword(password);
            const userId = await User.create(username, passwordHash, role);

            console.log(`${role} user created: ${username} (ID: ${userId})`);
        }
    } catch (error) {
        console.error(error);
    }

    process.exit();
}

seed();
