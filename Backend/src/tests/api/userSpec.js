"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const db_1 = __importDefault(require("../../data/db"));
const BASE = "localhost:3000";
describe("Users API Endpoints", () => {
    let token = "";
    let id = null;
    beforeAll(async () => {
        const res = await (0, supertest_1.default)(BASE)
            .post("/users")
            .send({
            firstname: "Basel",
            lastname: "Taher",
            password: "ismail",
        })
            .expect(201)
            .expect("content-type", /json/i);
        expect(res.body).toBeDefined();
        expect(res.body).toEqual(jasmine.objectContaining({
            User: jasmine.objectContaining({
                id: jasmine.any(Number),
                firstname: jasmine.any(String),
                lastname: jasmine.any(String),
            }),
            token: jasmine.any(String),
            message: "User created successfully!",
        }));
        id = res.body.User.id;
        token = res.body.token;
    });
    it("Create a new user", async () => {
        expect(token).toBeDefined();
        expect(token).toEqual(jasmine.any(String));
        expect(id).toBeDefined();
        expect(id).toEqual(jasmine.any(Number));
    });
    it("Gets all users", async () => {
        const res = await (0, supertest_1.default)(BASE)
            .get("/users")
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
            .expect("content-type", /json/i);
        expect(res.body).toBeDefined();
        expect(Array.isArray(res.body)).toBeTrue();
    });
    it("Gets user by ID", async () => {
        const res = await (0, supertest_1.default)(BASE)
            .get(`/users/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
            .expect("content-type", /json/i);
        expect(res.body).toBeDefined();
        expect(res.body).toEqual(jasmine.objectContaining({
            id: jasmine.any(Number),
            firstname: jasmine.any(String),
            lastname: jasmine.any(String),
        }));
    });
    afterAll(async () => {
        const conn = await db_1.default.connect();
        const query = `DELETE FROM users WHERE id=($1)`;
        await conn.query(query, [id]);
        conn.release();
    });
});
