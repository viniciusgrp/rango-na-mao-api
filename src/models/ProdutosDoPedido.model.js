import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";

const ProdutoPedido = sequelize.define(
  "ProdutoPedido",
  {
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    produtoId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    pedidoId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

ProdutoPedido.sync({ force: false });

export default ProdutoPedido;