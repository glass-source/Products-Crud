import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { User } from "../models/User";

const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById((req as any).user.id);
        res.status(200).json(user);

    } catch (error) {
        //res.json({ message: error });
    }
});

export { router as userRouter };
