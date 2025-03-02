import express from "express";
import UserRoutes from "./routes/user.routes.js";
import SessionRoutes from "./routes/session.routes.js";

const app = express();
app.use(express.json());

app.use("/users", UserRoutes);
app.use("/login", SessionRoutes);

export { app };
