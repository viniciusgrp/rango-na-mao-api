import { Router } from "express";
import { getTokenId } from "../middleware/auth.middleware.js";
import {
  criarCategoria,
  getCategoriasPorLoja,
  getCategoriasComProdutos,
  updateCategoria,
  deleteCategoria,
} from "../controllers/categoria.controller.js";

const router = Router();

router.get("/:id", getCategoriasComProdutos);
router.get("/", getTokenId, getCategoriasPorLoja);
router.post("/", getTokenId, criarCategoria);
router.patch("/:id", getTokenId, updateCategoria);
router.delete("/:id", getTokenId, deleteCategoria);

export default router;
