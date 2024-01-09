import { Router } from "express";

import { Auth } from "../middlewares/Auth";
import authRoutes from "./authRoute";
import userRoutes from "./userRoute";
import teamRoutes from "./teamRoute";
import listRoutes from "./listRoute";
import cardRoutes from "./cardRoute";

const router = Router();

// Mounting the authentication routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/teams", teamRoutes);
router.use("/lists", listRoutes);
router.use("/cards", cardRoutes);

export default router;
