import { Router } from "express";

import {
  signup,
  login,
  generateNewAccessToken,
  logout,
  changePassword,
} from "../controllers/authController";
import { validateReqBody } from "../middlewares/validator";
import { Auth } from "../middlewares/Auth";
import {
  changePasswordSchema,
  loginSchema,
  refreshTokenSchema,
  signUpSchema,
} from "../schemas/userSchema";

const router = Router();

router.post("/signup", validateReqBody(signUpSchema), signup);

router.post("/login", validateReqBody(loginSchema), login);

router.post(
  "/change-password",
  validateReqBody(changePasswordSchema),
  Auth,
  changePassword
);

router.post(
  "/get-new-access-token",
  validateReqBody(refreshTokenSchema),
  generateNewAccessToken
);

//Route for user logout
router.post("/logout", validateReqBody(refreshTokenSchema), Auth, logout);

export default router;
