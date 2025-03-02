import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";

const Endereco = sequelize.define(
  "Endereco",
  {
    enderecoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    enderecoPrincipal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    logradouro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complemento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referencia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nomeParaEntrega: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefoneParaContato: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    observacao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

Endereco.associate = (models) => {
  Endereco.belongsTo(models.User, {
    foreignKey: "userId",
    as: "usuario",
  });
};

Endereco.sync({ force: false });

export default Endereco;
