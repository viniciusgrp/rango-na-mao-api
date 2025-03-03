import Categoria from "../models/Categoria.model.js";

export const getCategoriasPorLoja = async (req, res) => {
  try {
    const lojaId = req.body.tokenId;
    const categorias = await Categoria.findAll({
      where: { lojaId },
    });

    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoriasComProdutos = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      where: { lojaId: req.params.id },
      include: "produtos",
    });

    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const criarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.create({
      ...req.body,
      lojaId: req.params.id,
    });

    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findOne({
      where: { categoriaId: req.params.id },
    });

    if (!categoria) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    const updatedCategoria = await categoria.update(req.body);

    res.status(200).json(updatedCategoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findOne({
      where: { categoriaId: req.params.id },
    });

    if (!categoria) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    await categoria.destroy();

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
