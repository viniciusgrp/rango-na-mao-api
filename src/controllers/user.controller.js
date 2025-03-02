import User from "../models/User.model.js";
import { updateUserShape } from "../schemas/user.schema.js";

import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  const users = await User.findAll();

  const validationPromises = users.map(async (user) => {
    const response = await updateUserShape.validate(user.dataValues, {
      stripUnknown: true,
      abortEarly: false,
    });
    return response;
  });

  const usersValidated = await Promise.all(validationPromises);

  res.status(200).json(usersValidated);
};

export const createUser = async (req, res) => {
  const validated = req.validatedBody;

  try {
    const userExists = await User.findOne({
      where: { email: validated.email },
    });

    if (userExists) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const cpfExists = await User.findOne({
      where: { cpf: validated.cpf },
    });

    if (cpfExists) {
      return res.status(400).json({ message: "CPF já cadastrado" });
    }

    const newUser = await User.create({
      ...validated,
      senha: bcrypt.hashSync(validated.senha, 10),
    });

    const response = await updateUserShape.validate(newUser.dataValues, {
      stripUnknown: true,
      abortEarly: false,
    });

    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
