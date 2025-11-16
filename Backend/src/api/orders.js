"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const orders_1 = require("../data/models/orders");
const orders = (0, express_1.Router)();
orders.get("/current/:id", middleware_1.auth, async (req, res) => {
    const { id } = req.params;
    if (isNaN(Number(id)))
        return res.status(400).json({ error: "Malformed ID, must be a number!" });
    try {
        const order = await (0, orders_1.currentOrderByUser)(Number(id));
        if (order)
            return res.status(200).json(order);
        else
            return res.status(200).json({});
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
orders.get("/completed/:id", middleware_1.auth, async (req, res) => {
    const { id } = req.params;
    if (isNaN(Number(id)))
        return res.status(400).json({ error: "Malformed ID, must be a number!" });
    try {
        const orders = await (0, orders_1.completedOrdersByUser)(Number(id));
        if (orders)
            return res.status(200).json(orders);
        else
            return res.status(200).json([]);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.default = orders;
