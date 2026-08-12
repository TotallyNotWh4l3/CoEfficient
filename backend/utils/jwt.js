import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h",
        },
    );
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export default {
    generateToken,
    verifyToken,
};
