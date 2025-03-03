import Produto from "../models/Produto.model.js";

export const getProdutosPorLoja = async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      where: { lojaId: req.params.id },
    });

    res.status(200).json(produtos);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const createProduto = async (req, res) => {
  try {
    const lojaId = req.tokenId;

    const produto = await Produto.create({
      ...req.validatedBody,
      lojaId
    });
    res.status(201).json(produto);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const updateProduto = async (req, res) => {
  const validated = req.validatedBody;

  try {
    const produto = await Produto.findOne({
      where: { produtoId: req.params.id },
    });

    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    const updatedProduto = await produto.update(validated);

    res.status(200).json(updatedProduto);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteProduto = async (req, res) => {
  try {
    const produto = await Produto.findOne({
      where: { produtoId: req.params.id },
    });

    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    await produto.destroy();

    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
