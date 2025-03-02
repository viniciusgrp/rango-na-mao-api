import { Router } from 'express'
import { getAllUsers, createUser } from '../controllers/user.controller.js'
import { createUserShape } from "../schemas/user.schema.js";
import { validate } from '../middleware/validation.middleware.js'

const router = Router()

router.get('/', getAllUsers)
router.post("/", validate(createUserShape), createUser);

export default router