import Pedido from "../models/Pedido.model.js";
import ProdutoPedido from "../models/ProdutosDoPedido.model.js";
import { v4 as uuidv4 } from "uuid";
import Produto from "../models/Produto.model.js";

export const getPedidoFromUsuario = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      where: { userId: req.params.id },
      include: [
        {
          model: Produto,
          as: "produtos",
          through: {
            model: ProdutoPedido,
            attributes: ["quantidade"],
          },
        },
      ],
    });

    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPedidoFromLoja = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      where: { lojaId: req.params.id },
      include: [
        {
          model: Produto,
          as: "produtos",
          through: {
            model: ProdutoPedido,
            attributes: ["quantidade"],
          },
        },
      ],
    });

    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPedido = async (req, res) => {
  try {
    const userId = req.tokenId;
    const lojaId = req.params.lojaId;
    const produtosData = req.validatedBody.produtos || [];

    const produtosPromises = produtosData.map(async (produtoData) => {
      let produto = await Produto.findOne({
        where: { produtoId: produtoData.produtoId },
      });

      if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      return { produto: produto.dataValues, quantidade: produtoData.quantidade };
    });

    const produtos = await Promise.all(produtosPromises);

    const pedido = await Pedido.create({
      pedidoId: uuidv4(),
      lojaId,
      userId,
      ...req.validatedBody,
    });

    const produtosDoPedidoPromises = produtos.map(async (produto) => {
        console.log(produto)
      return ProdutoPedido.create({
        pedidoId: pedido.pedidoId,
        produtoId: produto.produto.produtoId,
        quantidade: produto.quantidade,
      });
    });

    await Promise.all(produtosDoPedidoPromises);

    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePedido = async (req, res) => {
  try {
    const pedidoId = req.params.id;
    const produtosData = req.validatedBody.produtos || [];

    const pedido = await Pedido.findOne({
      where: { pedidoId: pedidoId },
    });

    if (!pedido) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    await pedido.update(req.validatedBody);

    await ProdutoPedido.destroy({ where: { pedidoId: pedidoId } });

    const produtosPromises = produtosData.map(async (produtoData) => {
      const produto = await Produto.findOne({
        where: { produtoId: produtoData.produtoId },
      });
      if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      return { produto, quantidade: produtoData.quantidade };
    });

    const produtosWithQuantities = await Promise.all(produtosPromises);

    const produtosDoPedidoPromises = produtosWithQuantities.map(
      async ({ produto, quantidade }) => {
        return ProdutoPedido.create({
          pedidoId: pedido.pedidoId,
          produtoId: produto.produtoId,
          quantidade: quantidade,
        });
      }
    );

    await Promise.all(produtosDoPedidoPromises);

    res.status(200).json(pedido);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const deletePedido = async (req, res) => {
  try {
    const pedido = await Pedido.findOne({
      where: { pedidoId: req.params.id },
    });

    if (!pedido) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    await pedido.destroy();

    res.status(200).json({ message: "Pedido deletado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
