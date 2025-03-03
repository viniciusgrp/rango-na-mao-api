import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";

const Produto = sequelize.define(
  "Produto",
  {
    produtoId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    lojaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    servePessoas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    removeIngredientes: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    custoProducao: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    valorDesconto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adicionais: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

Produto.sync({ force: false });

export default Produto;
