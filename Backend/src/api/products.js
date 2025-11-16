"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const products_1 = require("../data/models/products");
const products = (0, express_1.Router)();
products.get("/top_five", async (req, res) => {
    try {
        const products = await (0, products_1.getTopFivePopularProducts)();
        if (products && products.length > 0)
            return res.status(200).json(products);
        else
            return res.status(404).json([]);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
products.get("/category/:category", async (req, res) => {
    const { category } = req.params;
    try {
        const products = await (0, products_1.getProductsByCategory)(category);
        if (products && products.length > 0)
            return res.status(200).json(products);
        else
            return res.status(404).json([]);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
products.get("/:id", async (req, res) => {
    const { id } = req.params;
    if (isNaN(Number(id)))
        return res.status(400).json({ error: "Malformed ID, must be a number!" });
    try {
        const product = await (0, products_1.getProductByID)(Number(id));
        if (product)
            return res.status(200).json(product);
        else
            return res.status(404).json({});
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
products.get("/", async (req, res) => {
    try {
        const productsList = await (0, products_1.getAllProducts)();
        if (productsList && productsList.length > 0)
            return res.status(200).json(productsList);
        else
            return res.status(200).json([]);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
products.post("/", middleware_1.auth, async (req, res) => {
    const { name, price, category } = req.body;
    try {
        const new_product = await (0, products_1.createProduct)({ name, price, category });
        if (new_product)
            return res.status(200).json(new_product);
        else
            return res.status(404).json({});
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.default = products;
