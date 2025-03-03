import Produto from "../models/Produto.model.js";
import Ingrediente from "../models/Ingrediente.model.js";
import IngredienteDoProduto from "../models/IngredienteDoProduto.model.js";

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
    const ingredientesData = req.validatedBody.ingredientes || [];

    const { ingredientes, ...produtoData } = req.validatedBody;

    const produto = await Produto.create({
      ...produtoData,
      lojaId
    });

    const ingredientesPromises = ingredientesData.map(
      async (ingredienteData) => {
        let ingrediente = await Ingrediente.findOne({
          where: { nome: ingredienteData.nome, lojaId: lojaId },
        });

        if (!ingrediente) {
          ingrediente = await Ingrediente.create({
            ...ingredienteData,
            lojaId,
            ingredienteId: uuidv4(),
          });
        }
        return ingrediente;
      }
    );

    const ingredientesCreate = await Promise.all(ingredientesPromises);

    const createIngredienteDoProdutoPromises = ingredientesCreate.map(
      async (ingrediente) => {
        await IngredienteDoProduto.create({
          ingredienteId: ingrediente.ingredienteId,
          produtoId: produto.produtoId,
        });
      }
    );

    await Promise.all(createIngredienteDoProdutoPromises);

    res.status(201).json(produto);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
export const updateProduto = async (req, res) => {
  try {
    const lojaId = req.tokenId;
    const produtoId = req.params.id;
    const ingredientesData = req.validatedBody.ingredientes || [];

    // Remove 'ingredientes' from the validatedBody
    const { ingredientes, ...produtoData } = req.validatedBody;

    const produto = await Produto.findOne({
      where: { produtoId: produtoId },
    });

    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    await produto.update(produtoData);

    await IngredienteDoProduto.destroy({ where: { produtoId: produtoId } });

    const ingredientesPromises = ingredientesData.map(
      async (ingredienteData) => {
        let ingrediente = await Ingrediente.findOne({
          where: { nome: ingredienteData.nome, lojaId: lojaId },
        });

        if (!ingrediente) {
          ingrediente = await Ingrediente.create({
            ...ingredienteData,
            lojaId,
            ingredienteId: uuidv4(),
          });
        }
        return ingrediente;
      }
    );

    const ingredientesToCreate = await Promise.all(ingredientesPromises);

    const createIngredienteDoProdutoPromises = ingredientesToCreate.map(
      async (ingrediente) => {
        await IngredienteDoProduto.create({
          ingredienteId: ingrediente.ingredienteId,
          produtoId: produto.produtoId,
        });
      }
    );

    await Promise.all(createIngredienteDoProdutoPromises);

    res.status(200).json(produto);
  } catch (error) {
    console.log(error);
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
