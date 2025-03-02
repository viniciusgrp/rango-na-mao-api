import * as dotenv from "dotenv"; // Importe o dotenv
dotenv.config();

import { app } from "./app.js";

import { sequelize } from "./config/index.js";

const server = app.listen(3000);

server.on("listening", async () => {
  console.log("Server is running on port 3000");
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connected!");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
});
