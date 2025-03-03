import * as dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";

import { sequelize } from "./config/index.js";

import User from "./models/User.model.js";
import Endereco from "./models/Endereco.model.js";
import Produto from "./models/Produto.model.js";
import Ingrediente from "./models/Ingrediente.model.js";
import IngredienteDoProduto from "./models/IngredienteDoProduto.model.js";

User.hasMany(Endereco, {
  foreignKey: "userId",
  as: "enderecos",
});

User.hasMany(Produto, {
  foreignKey: "lojaId",
  as: "produtos",
});

User.hasMany(Ingrediente, {
  foreignKey: "lojaId",
  as: "ingredientes",
});

Endereco.belongsTo(User, {
  foreignKey: "userId",
  as: "usuario",
});

Produto.belongsTo(User, {
  foreignKey: "lojaId",
  as: "loja",
});

Ingrediente.belongsTo(User, {
  foreignKey: "lojaId",
  as: "loja",
});

Ingrediente.belongsToMany(Produto, {
  through: IngredienteDoProduto,
  foreignKey: "ingredienteId",
  as: "produtos",
});

Produto.belongsToMany(Ingrediente, {
  through: IngredienteDoProduto,
  foreignKey: "produtoId",
  as: "ingredientes",
});

IngredienteDoProduto.belongsTo(Ingrediente, {
  foreignKey: "ingredienteId",
  as: "ingrediente",
});

IngredienteDoProduto.belongsTo(Produto, {
  foreignKey: "produtoId",
  as: "produto",
});

const server = app.listen(3000);

server.on("listening", async () => {
  console.log("Server is running on port 3000");
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Database connected!");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
});
