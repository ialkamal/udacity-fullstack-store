"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./api/users"));
const products_1 = __importDefault(require("./api/products"));
const orders_1 = __importDefault(require("./api/orders"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get("/", function (req, res) {
    res.status(200).json({ msg: "API is up!" });
});
app.use("/users", users_1.default);
app.use("/products", products_1.default);
app.use("/orders", orders_1.default);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
