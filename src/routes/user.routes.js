import { Router } from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  setSuperUser,
  getUserById,
} from "../controllers/user.controller.js";
import { createUserShape, updateUserShape } from "../schemas/user.schema.js";
import { validate } from "../middleware/validation.middleware.js";
import { superUser, isSameUser } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", superUser, getAllUsers);
router.get("/:id", superUser, getUserById);
router.post("/", validate(createUserShape), createUser);
router.patch("/:id", isSameUser, validate(updateUserShape), updateUser);
router.delete("/:id", isSameUser, deleteUser);
router.patch("/:id/administrador", superUser, setSuperUser);

export default router;
