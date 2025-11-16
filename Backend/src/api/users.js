"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const users_1 = require("../data/models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const users = (0, express_1.Router)();
users.post("/", async (req, res) => {
    const { firstname, lastname, password } = req.body;
    const hash = bcrypt_1.default.hashSync(password + process.env.PEPPER, Number(process.env.SALT));
    try {
        const newUser = await (0, users_1.createUser)({
            firstname,
            lastname,
            hash,
        });
        if (newUser) {
            const token = jsonwebtoken_1.default.sign({
                id: newUser.id,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
            }, process.env.JWT_SECRET ?? "hello");
            return res.status(201).json({
                User: {
                    id: newUser.id,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                },
                token,
                message: "User created successfully!",
            });
        }
        else
            return res.status(500).json({ message: "Error in creating the user" });
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
users.get("/", middleware_1.auth, async (req, res) => {
    try {
        const usersList = await (0, users_1.getAllUsers)();
        if (usersList && usersList.length > 0)
            return res.status(200).json(usersList);
        else
            return res.status(200).json([]);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
users.get("/:id", middleware_1.auth, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await (0, users_1.getUserByID)(Number(id));
        if (user)
            return res.status(200).json(user);
        else
            return res.status(200).json([]);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.default = users;
