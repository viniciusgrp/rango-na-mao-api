import express from "express";
import UserRoutes from "./routes/user.routes.js";
import SessionRoutes from "./routes/session.routes.js";
import EnderecoRoutes from "./routes/endereco.routes.js";
import ProdutoRoutes from "./routes/produto.routes.js";
import IngredienteRoutes from "./routes/ingrediente.routes.js";
import CategoriaRoutes from "./routes/categoria.routes.js";

const app = express();
app.use(express.json());

app.use("/users", UserRoutes);
app.use("/login", SessionRoutes);
app.use("/endereco", EnderecoRoutes);
app.use("/produtos", ProdutoRoutes);
app.use("/ingredientes", IngredienteRoutes);
app.use("/ingredientes", IngredienteRoutes);
app.use("/categorias", CategoriaRoutes);

export { app };
