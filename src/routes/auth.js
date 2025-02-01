"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const Logger_1 = require("../decorators/Logger");
const router = express_1.default.Router();
exports.authRouter = router;
class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, 10);
                const newUser = new User_1.User({
                    username: req.body.username,
                    password: hashedPassword
                });
                yield newUser.save();
                res.status(201).json({ message: "Usuario registrado" });
            }
            catch (error) {
                res.status(500).json({ error: "Error en el registro" });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!process.env.JWT_SECRET) {
                    throw new Error("JWT_SECRET no configurado");
                }
                const user = yield User_1.User.findOne({ username: req.body.username });
                if (!user) {
                    res.status(400).json({ message: "Usuario no encontrado" });
                    return;
                }
                const isMatch = yield bcryptjs_1.default.compare(req.body.password, user.password);
                if (!isMatch) {
                    res.status(400).json({ message: "Contraseña incorrecta" });
                    return;
                }
                const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "1h"
                });
                res.json({ token });
            }
            catch (error) {
                res.status(500).json({ msg: "Error en el login", error: error.message });
            }
        });
    }
}
__decorate([
    Logger_1.Logger,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController, "register", null);
__decorate([
    Logger_1.Logger,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController, "login", null);
// Configuración final de rutas
router.post("/register", (req, res, next) => AuthController.register(req, res).catch(next));
router.post("/login", (req, res, next) => AuthController.login(req, res).catch(next));
