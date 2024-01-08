import { Router } from "express";

import { validateReqBody } from "../middlewares/validator";
import { Auth } from "../middlewares/Auth";
import { updateUserSchema } from "../schemas/userSchema";
import {
  deleteUser,
  getUserProfile,
  updateUser,
} from "../controllers/userController";

const router = Router();

router
  .route("/")
  .get(Auth, getUserProfile)
  .put(Auth, validateReqBody(updateUserSchema), updateUser)
  .patch(Auth, deleteUser);

export default router;
