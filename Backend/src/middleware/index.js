"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token || "", process.env.JWT_SECRET);
        // Ensure decoded is an object and contains expected user fields before assigning
        if (decoded && typeof decoded === "object" && "id" in decoded) {
            req.user = decoded;
            next();
            return;
        }
        else
            throw Error("Invalid or missing token");
    }
    catch (err) {
        res.status(401).json(err);
    }
};
exports.auth = auth;
