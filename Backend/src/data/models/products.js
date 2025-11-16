"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getTopFivePopularProducts = exports.getProductsByCategory = exports.getProductByID = exports.getAllProducts = void 0;
const db_1 = __importDefault(require("../db"));
//Product CRUD Operations
const getAllProducts = async () => {
    try {
        const conn = await db_1.default.connect();
        const query = `SELECT id, name, price, category FROM products`;
        const result = await conn.query(query, []);
        conn.release();
        return result.rows;
    }
    catch (e) {
        throw Error("DB Error in getting all products.");
    }
};
exports.getAllProducts = getAllProducts;
const getProductByID = async (id) => {
    try {
        const conn = await db_1.default.connect();
        const query = `SELECT id, name, price, category FROM products WHERE id=($1)`;
        const result = await conn.query(query, [id]);
        conn.release();
        return result.rows[0];
    }
    catch (e) {
        throw Error("DB Error in getting product by ID.");
    }
};
exports.getProductByID = getProductByID;
const getProductsByCategory = async (category) => {
    try {
        const conn = await db_1.default.connect();
        const query = `SELECT * FROM products WHERE category=($1)`;
        const result = await conn.query(query, [category]);
        conn.release();
        return result.rows;
    }
    catch (e) {
        throw Error("DB Error in getting products by category");
    }
};
exports.getProductsByCategory = getProductsByCategory;
const getTopFivePopularProducts = async () => {
    try {
        const conn = await db_1.default.connect();
        const query = `SELECT p.name,count(p.name) as count, p.price, 
                  p.category FROM products as p
                  JOIN products_orders as po ON p.id=po.product_id
                  JOIN orders as o ON po.order_id=o.id
                  GROUP BY p.name, p.price, p.category
                  ORDER BY count DESC LIMIT 5`;
        const result = await conn.query(query, []);
        conn.release();
        return result.rows;
    }
    catch (e) {
        throw Error("DB Error in getting five most popular products.");
    }
};
exports.getTopFivePopularProducts = getTopFivePopularProducts;
const createProduct = async (product) => {
    try {
        const conn = await db_1.default.connect();
        const query = `INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *`;
        const result = await conn.query(query, [
            product.name,
            product.price,
            product.category,
        ]);
        conn.release();
        return result.rows[0];
    }
    catch (e) {
        throw Error("DB Error in creating a new product.");
    }
};
exports.createProduct = createProduct;
