import { Router } from "express";
import { validate } from "../middleware/validation.middleware.js";
import { getTokenId, superUser } from "../middleware/auth.middleware.js";
import {
  getProdutosPorLoja,
  createProduto,
  updateProduto,
  deleteProduto,
} from "../controllers/produto.controller.js";
import { createProdutoSchema } from "../schemas/produto.schema.js";

const router = Router();

router.get("/:id", getProdutosPorLoja);
router.post(
  "/",
  validate(createProdutoSchema),
  getTokenId,
  createProduto
);
router.patch("/:id", getTokenId, updateProduto);
router.delete("/:id", getTokenId, deleteProduto);

export default router;
