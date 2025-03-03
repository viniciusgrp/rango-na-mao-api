import { Router } from "express";
import { validate } from "../middleware/validation.middleware.js";
import { getTokenId } from "../middleware/auth.middleware.js";
import {
  createIngrediente,
  deleteIngrediente,
  getIngredientes,
  updateIngrediente,
} from "../controllers/ingrediente.controller.js";
import { createIngredienteSchema } from "../schemas/ingrediente.schema.js";

const router = Router();

router.get("/:id", getIngredientes);
router.post(
  "/",
  validate(createIngredienteSchema),
  getTokenId,
  createIngrediente
);
router.patch(
  "/:id",
  getTokenId,
  validate(createIngredienteSchema),
  updateIngrediente
);
router.delete("/:id", getTokenId, deleteIngrediente);

export default router;
