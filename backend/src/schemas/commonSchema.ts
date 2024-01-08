import Joi from "joi";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants/pagination";

export const listSchema = Joi.object({
  page: Joi.number().integer().min(1).default(DEFAULT_PAGE),

  size: Joi.number().integer().min(1).max(40).default(DEFAULT_PAGE_SIZE),

  search: Joi.string().default(""),
});
