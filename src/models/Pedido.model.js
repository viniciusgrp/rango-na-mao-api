import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";

const Pedido = sequelize.define(
  "Pedido",
  {
    pedidoId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    enderecoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lojaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    personalizaIngredientes: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: false
    },
    valorTotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Aguardando confirmação da loja",
    },
    observacao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    formaDePagamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Pedido.sync({ force: false });

export default Pedido;
