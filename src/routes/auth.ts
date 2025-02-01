import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Logger } from "../decorators/Logger";

const router = express.Router();

class AuthController {
  @Logger
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword
      });

      await newUser.save();
      res.status(201).json({ message: "Usuario registrado" });
    } catch (error) {
      res.status(500).json({ error: "Error en el registro" });
    }
  }

  @Logger
  static async login(req: Request, res: Response): Promise<void> {
    try {

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET no configurado");
      }

      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(400).json({ message: "Usuario no encontrado" });
        return;
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Contraseña incorrecta" });
        return;
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ msg: "Error en el login", error: (error as Error).message });
    }
  }
}

// Configuración final de rutas
router.post("/register", (req, res, next) =>
  AuthController.register(req, res).catch(next)
);

router.post("/login", (req, res, next) =>
  AuthController.login(req, res).catch(next)
);

export { router as authRouter };