"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../../data/models/products");
const db_1 = __importDefault(require("../../data/db"));
describe("Product Models", () => {
    let id;
    let category = "Electronics";
    beforeAll(async () => {
        const new_product = await (0, products_1.createProduct)({
            name: "Test Laptop",
            price: "999.99",
            category: category,
        });
        id = new_product.id;
        expect(new_product).toEqual(jasmine.objectContaining({
            id: jasmine.any(Number),
            name: jasmine.any(String),
            price: jasmine.any(String),
            category: jasmine.any(String),
        }));
    });
    it("DB createProduct method", async () => {
        expect(products_1.createProduct).toBeDefined();
        expect(id).toEqual(jasmine.any(Number));
    });
    it("DB getProductByID method", async () => {
        expect(products_1.getProductByID).toBeDefined();
        const product = await (0, products_1.getProductByID)(Number(id));
        expect(product).toEqual(jasmine.objectContaining({
            id: jasmine.any(Number),
            name: jasmine.any(String),
            price: jasmine.any(String),
            category: jasmine.any(String),
        }));
    });
    it("DB getAllProducts method", async () => {
        expect(products_1.getAllProducts).toBeDefined();
        const allProducts = await (0, products_1.getAllProducts)();
        expect(Array.isArray(allProducts)).toBeTrue();
        expect(allProducts.length).toBeGreaterThan(0);
    });
    it("DB getProductsByCategory method", async () => {
        expect(products_1.getProductsByCategory).toBeDefined();
        const products = await (0, products_1.getProductsByCategory)(category);
        expect(Array.isArray(products)).toBeTrue();
        expect(products.length).toBeGreaterThan(0);
        expect(products[0].category).toEqual(category);
    });
    it("DB getTopFivePopularProducts method", async () => {
        expect(products_1.getTopFivePopularProducts).toBeDefined();
        const topProducts = await (0, products_1.getTopFivePopularProducts)();
        expect(Array.isArray(topProducts)).toBeTrue();
        expect(topProducts.length).toBeLessThanOrEqual(5);
    });
    afterAll(async () => {
        const conn = await db_1.default.connect();
        const query = `DELETE FROM products WHERE id=($1)`;
        await conn.query(query, [id]);
        conn.release();
    });
});
