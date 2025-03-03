import { Router } from "express";
import { validate } from "../middleware/validation.middleware.js";
import { getTokenId } from "../middleware/auth.middleware.js";
import {
  createIngrediente,
  deleteIngrediente,
  getIngredientes,
  updateIngrediente,
} from "../controllers/ingrediente.controller.js";
import { createProdutoSchema } from "../schemas/produto.schema.js";

const router = Router();

router.get("/:id", getIngredientes);
router.post("/", validate(createProdutoSchema), getTokenId, createIngrediente);
router.patch("/:id", getTokenId, updateIngrediente);
router.delete("/:id", getTokenId, deleteIngrediente);

export default router;
