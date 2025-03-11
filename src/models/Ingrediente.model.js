import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";

const Ingrediente = sequelize.define(
  "Ingrediente",
  {
    ingredienteId: {
      type: DataTypes.UUID,
      primaryKey: true,
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
    lojaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: true,
  }
);

Ingrediente.sync({ force: false });

export default Ingrediente;
