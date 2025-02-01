"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, nex) {
    try {
        const token = req.header("auth-token");
        if (!token)
            res.status(401).json({ message: "No autorizado" });
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        nex();
    }
    catch (_a) {
        res.status(400).json({ message: "Token inválido" });
    }
}
