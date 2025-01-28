import express from "express";
import cors from "cors";
import contactRouter from "../../application/routes/ContactRoutes";
import { errorHandler } from "../middlewares/errorHandler";

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Injection des routes
app.use("/contact", contactRouter);

// Middleware pour gérer les erreurs
app.use(errorHandler);

export default app; // Exporter l'application configurée
