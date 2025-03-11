import { Router } from "express";
import { getTokenId, isSameUser } from "../middleware/auth.middleware.js";
import {
  createPedido,
  deletePedido,
  getPedidoFromLoja,
  getPedidoFromUsuario,
  updatePedido,
} from "../controllers/pedido.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import { createUpdatePedidoSchema } from "../schemas/pedido.schema.js";

const router = Router();

router.get("/:id", isSameUser, getPedidoFromUsuario);
router.get("/loja/:id", getPedidoFromLoja);
router.post(
  "/:lojaId",
  getTokenId,
  validate(createUpdatePedidoSchema),
  createPedido
);
router.patch(
  "/:id",
  getTokenId,
  validate(createUpdatePedidoSchema),
  updatePedido
);
router.delete("/:id", deletePedido);

export default router;