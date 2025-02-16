import dotenv from 'dotenv';
import express from "express";
import https from "https";
import fs from "fs";
import helmet from "helmet";
import cors from "cors";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/users";
import { productRouter } from "./routes/products";
import "reflect-metadata"; // Necesario para decoradores
import { db } from "./database/Database";

dotenv.config();

const origin = process.env.BASE_URL;
const app = express();

// Seguridad
app.use(helmet());
app.use(cors({
    origin: origin,
    credentials: true
  }));
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
    res.send("🔒 API segura con TypeScript");
});
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

// Configurar HTTPS
const options = {
    key: fs.readFileSync("../localhost+2-key.pem"),
    cert: fs.readFileSync("../localhost+2.pem"),
};

db;

https.createServer(options, app).listen(443, () => {
    console.log("🔒 Servidor HTTPS corriendo en https://localhost");
});
