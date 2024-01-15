import { Router } from "express";

import { validateReqBody, validateReqQuery } from "../middlewares/validator";
import { Auth } from "../middlewares/Auth";
import {
  createUserTeam,
  deleteUserTeam,
  getUserTeamDetailById,
  getUserTeamByTeamId,
  updateUserTeam,
  getUserTeamByUserId,
  getUserTeamByUserIdAndTeamId,
  getMembersByTeamId,
} from "../controllers/userTeamController";
import {
  UserTeamSchema,
  updateUserTeamSchema,
} from "../schemas/userTeamSchema";

const router = Router();

router
  .route("/")
  .get(Auth, validateReqQuery(UserTeamSchema), getUserTeamByUserIdAndTeamId)
  .post(Auth, validateReqBody(UserTeamSchema), createUserTeam);

router.route("/user").get(Auth, getUserTeamByUserId);

router
  .route("/:id")
  .get(Auth, getUserTeamDetailById)
  .put(Auth, validateReqBody(updateUserTeamSchema), updateUserTeam)
  .delete(Auth, deleteUserTeam);

router.route("/team/:id").get(Auth, getUserTeamByTeamId);

router.route("/team-member/:id").get(Auth, getMembersByTeamId);

export default router;
// acde4a32-6d3c-4c73-b96f-a14256744cf9
