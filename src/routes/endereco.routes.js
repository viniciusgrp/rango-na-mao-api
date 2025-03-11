import { Router } from "express";
import {
  createEndereco,
  updateEndereco,
  deleteEndereco,
  getEnderecos,
  getEnderecosDeUsuario,
} from "../controllers/endereco.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import { createEnderecoSchema } from "../schemas/endereco.schema.js";
import { getTokenId, superUser } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", validate(createEnderecoSchema), getTokenId, createEndereco);
router.patch("/:id", updateEndereco);
router.delete("/:id", deleteEndereco);
router.get("/", getTokenId, getEnderecos);
router.get("/:id", superUser, getEnderecosDeUsuario);

export default router;
