import express, { Request, Response } from "express";
import users from "./api/users";
import products from "./api/products";
import orders from "./api/orders";
import bodyParser from "body-parser";
import cors from "cors";

const app: express.Application = express();
const PORT = process.env.PORT || 3000;
const address: string = `0.0.0.0:${PORT}`;

app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req: Request, res: Response) {
  res.status(200).json({ msg: "API is up!" });
});

app.use("/users", users);
app.use("/products", products);
app.use("/orders", orders);

app.listen(PORT, function () {
  console.log(`starting app on: ${address}`);
});
