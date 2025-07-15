import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Not authorized - no token" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};
