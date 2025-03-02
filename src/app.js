import express from "express";
import UserRoutes from "./routes/user.routes.js";

const app = express();
app.use(express.json());

app.use("/users", UserRoutes);

export { app };
