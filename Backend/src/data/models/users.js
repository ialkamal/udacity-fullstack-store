"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getUserByID = exports.createUser = void 0;
const db_1 = __importDefault(require("../db"));
//User CRUD Operations
const createUser = async (user) => {
    try {
        const conn = await db_1.default.connect();
        const query = `INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *`;
        const result = await conn.query(query, [
            user.firstname,
            user.lastname,
            user.hash,
        ]);
        conn.release();
        return result.rows[0];
    }
    catch (e) {
        throw Error("DB Error in creating a new user.");
    }
};
exports.createUser = createUser;
const getUserByID = async (id) => {
    try {
        const conn = await db_1.default.connect();
        const query = `SELECT id, firstname, lastname FROM users WHERE id=($1)`;
        const result = await conn.query(query, [id]);
        conn.release();
        return result.rows[0];
    }
    catch (e) {
        throw Error("DB Error in getting user by ID.");
    }
};
exports.getUserByID = getUserByID;
const getAllUsers = async () => {
    try {
        const conn = await db_1.default.connect();
        const query = `SELECT id, firstname, lastname FROM users`;
        const result = await conn.query(query, []);
        conn.release();
        return result.rows;
    }
    catch (e) {
        throw Error("DB Error in getting all users.");
    }
};
exports.getAllUsers = getAllUsers;
