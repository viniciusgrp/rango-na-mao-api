import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";

const IngredienteDoProduto = sequelize.define(
  "IngredienteDoProduto",
  {
    ingredienteId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    produtoId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

IngredienteDoProduto.sync({ force: false });

export default IngredienteDoProduto;
