import { Router } from "express";

import { validateReqBody } from "../middlewares/validator";
import { Auth } from "../middlewares/Auth";
import {
  createCard,
  deleteCard,
  getCardDetailById,
  getCardByListId,
  updateCard,
  updateCardStatus,
  getCardSearch,
  getCardByAssigneeId,
} from "../controllers/cardController";
import { createCardSchema, updateCardSchema } from "../schemas/cardSchema";

const router = Router();

router.route("/").post(Auth, validateReqBody(createCardSchema), createCard);

router.route("/search").get(Auth, getCardSearch);

router.route("/filter").get(Auth, getCardByAssigneeId);

router
  .route("/:id")
  .get(Auth, getCardDetailById)
  .put(Auth, validateReqBody(updateCardSchema), updateCard)
  .delete(Auth, deleteCard);

router.route("/status/:id").put(Auth, updateCardStatus);

router.route("/list/:id").get(Auth, getCardByListId);

export default router;
