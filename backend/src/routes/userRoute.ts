import { Router } from "express";

import { validateReqBody } from "../middlewares/validator";
import { Auth } from "../middlewares/Auth";
import { updateUserSchema } from "../schemas/userSchema";
import {
  deleteUser,
  getListOfUsersToAdd,
  getUserById,
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

router.route("/list/:teamId").get(Auth, getListOfUsersToAdd);

router.route("/profile").get(Auth, getUserProfile);

router.route("/user/:id").get(Auth, getUserById);

router.route("/:username").get(Auth, getUserByUsername);

export default router;
