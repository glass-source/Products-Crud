import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, nex: NextFunction) {
    try {
        const token = req.header("auth-token") as string;
        const verified = jwt.verify(token, process.env.JWT_SECRET as string);

        if (verified) {
            (req as any).user = verified;
            nex();
        }

    } catch {
        res.status(400).json({message: "No autorizado"});
    }
}
