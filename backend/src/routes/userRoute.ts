import { Router } from "express";

import { validateReqBody } from "../middlewares/validator";
import { Auth } from "../middlewares/Auth";
import { updateUserSchema } from "../schemas/userSchema";
import {
  checkTokenvalid,
  deleteUser,
  getUserByUsername,
  getUserProfile,
  updateUser,
} from "../controllers/userController";

const router = Router();

router
  .route("/")
  .get(Auth, getUserProfile)
  .put(Auth, validateReqBody(updateUserSchema), updateUser)
  .patch(Auth, deleteUser);

router.route("/profile").get(Auth, getUserProfile);

router.route("/:username").get(Auth, getUserByUsername);

export default router;
