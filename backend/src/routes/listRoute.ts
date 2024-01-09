import { Router } from "express";

import { validateReqBody } from "../middlewares/validator";
import { Auth } from "../middlewares/Auth";
import {
  createList,
  deleteList,
  getListDetailById,
  getListByTeamId,
  updateList,
} from "../controllers/listController";
import { createListSchema, updateListSchema } from "../schemas/listSchema";

const router = Router();

router.route("/").post(Auth, validateReqBody(createListSchema), createList);

router
  .route("/:id")
  .get(Auth, getListDetailById)
  .put(Auth, validateReqBody(updateListSchema), updateList)
  .delete(Auth, deleteList);

router.route("/team/:id").get(Auth, getListByTeamId);

export default router;
