"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../data/models/users");
const db_1 = __importDefault(require("../../data/db"));
describe("User Models", () => {
    let id;
    beforeAll(async () => {
        const new_user = await (0, users_1.createUser)({
            firstname: "Basel",
            lastname: "Taher",
            hash: "ismail",
        });
        id = new_user.id;
        expect(new_user).toEqual(jasmine.objectContaining({
            id: jasmine.any(Number),
            firstname: jasmine.any(String),
            lastname: jasmine.any(String),
        }));
    });
    it("DB createUser method", async () => {
        expect(users_1.createUser).toBeDefined();
        expect(id).toEqual(jasmine.any(Number));
    });
    it("DB getUserByID method", async () => {
        expect(users_1.getUserByID).toBeDefined();
        const user = await (0, users_1.getUserByID)(Number(id));
        expect(user).toEqual(jasmine.objectContaining({
            id: jasmine.any(Number),
            firstname: jasmine.any(String),
            lastname: jasmine.any(String),
        }));
    });
    it("DB getAllUsers method", async () => {
        expect(users_1.getAllUsers).toBeDefined();
        const allUsers = await (0, users_1.getAllUsers)();
        expect(Array.isArray(allUsers)).toBeTrue();
    });
    afterAll(async () => {
        const conn = await db_1.default.connect();
        const query = `DELETE FROM users WHERE id=($1)`;
        await conn.query(query, [id]);
        conn.release();
    });
});
