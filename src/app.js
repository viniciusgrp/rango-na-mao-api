import express from "express";
import UserRoutes from "./routes/user.routes.js";
import SessionRoutes from "./routes/session.routes.js";
import EnderecoRoutes from "./routes/endereco.routes.js";

const app = express();
app.use(express.json());

app.use("/users", UserRoutes);
app.use("/login", SessionRoutes);
app.use("/endereco", EnderecoRoutes);

export { app };