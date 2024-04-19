import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);

export default app;
