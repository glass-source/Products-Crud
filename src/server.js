"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./routes/auth");
const users_1 = require("./routes/users");
const products_1 = require("./routes/products");
require("reflect-metadata"); // Necesario para decoradores
const Database_1 = require("./database/Database");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Seguridad
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://127.0.0.1:5500',
    credentials: true
}));
app.use(express_1.default.json());
// Rutas
app.get("/", (req, res) => {
    res.send("🔒 API segura con TypeScript");
});
app.use("/auth", auth_1.authRouter);
app.use("/users", users_1.userRouter);
app.use("/products", products_1.productRouter);
// Configurar HTTPS
const options = {
    key: fs_1.default.readFileSync("server.key"),
    cert: fs_1.default.readFileSync("server.crt"),
};
Database_1.db;
https_1.default.createServer(options, app).listen(443, () => {
    console.log("🔒 Servidor HTTPS corriendo en https://localhost");
});
