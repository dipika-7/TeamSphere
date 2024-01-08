import { Router } from "express";

import { Auth } from "../middlewares/Auth";
import authRoutes from "./authRoute";
import userRoutes from "./userRoute";
import teamRoutes from "./teamRoute";

const router = Router();

// Mounting the authentication routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/teams", teamRoutes);

export default router;
