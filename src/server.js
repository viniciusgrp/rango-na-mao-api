import * as dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";

import { sequelize } from "./config/index.js";

import User from "./models/User.model.js";
import Endereco from "./models/Endereco.model.js";

User.hasMany(Endereco, {
  foreignKey: "userId",
  as: "enderecos",
});
Endereco.belongsTo(User, {
  foreignKey: "userId",
  as: "usuario",
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
