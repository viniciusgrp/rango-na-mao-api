import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";

const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataNascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tipoUsuario: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    validado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    superUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
  },
  {
    timestamps: true,
  }
);

User.sync({ force: false });

export default User;
