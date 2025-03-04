import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";

const Categoria = sequelize.define(
  "Categoria",
  {
    categoriaId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    ordem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Categoria.sync({ force: false });

export default Categoria;
