import Ingrediente from "../models/Ingrediente.model.js";

export const getIngredientes = async (req, res) => {
  try {
    const ingredientes = await Ingrediente.findAll();

    res.status(200).json(ingredientes);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const createIngrediente = async (req, res) => {
  try {
    const lojaId = req.tokenId;
    req.validatedBody.lojaId = lojaId;

    const ingrediente = await Ingrediente.create(req.validatedBody);

    res.status(201).json(ingrediente);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateIngrediente = async (req, res) => {
  const validated = req.validatedBody;

  try {
    const ingrediente = await Ingrediente.findOne({
      where: { ingredienteId: req.params.id },
    });

    if (!ingrediente) {
      return res.status(404).json({ message: "Ingrediente não encontrado" });
    }

    const updatedIngrediente = await ingrediente.update(validated);

    res.status(200).json(updatedIngrediente);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteIngrediente = async (req, res) => {
  try {
    const ingrediente = await Ingrediente.findOne({
      where: { ingredienteId: req.params.id },
    });

    if (!ingrediente) {
      return res.status(404).json({ message: "Ingrediente não encontrado" });
    }

    await ingrediente.destroy();

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
