import { Router } from "express";

import { validateReqBody } from "../middlewares/validator";
import { Auth } from "../middlewares/Auth";
import {
  checkTeamCreateByUser,
  createTeam,
  deleteTeam,
  getTeamDetailById,
  getTeamsByUserId,
  updateTeam,
} from "../controllers/teamController";
import { createTeamSchema, updateTeamSchema } from "../schemas/teamSchema";

const router = Router();

router
  .route("/")
  .get(Auth, getTeamsByUserId)
  .post(Auth, validateReqBody(createTeamSchema), createTeam);

router
  .route("/:id")
  .get(Auth, getTeamDetailById)
  .put(Auth, validateReqBody(updateTeamSchema), updateTeam)
  .delete(Auth, deleteTeam);

router.route("/check-team/:id").get(Auth, checkTeamCreateByUser);

export default router;
