import express from "express";
import cors from "cors";
import contactRouter from "../../application/routes/ContactRoutes";
import authRouter from "../../application/routes/AuthRoutes";
import userRouter from "../../application/routes/UserRoutes";
import { errorHandler } from "../middlewares/errorHandler";

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Injection des routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "🚀 API is running!" });
});
app.use("/auth", authRouter);
app.use("/contact", contactRouter);
app.use("/users", userRouter);

// Middleware pour gérer les erreurs
app.use(errorHandler);

export default app; // Exporter l'application configurée
