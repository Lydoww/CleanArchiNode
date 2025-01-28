import express from "express";
import cors from "cors";
import contactRouter from "../../application/routes/ContactRoutes";
import { errorHandler } from "../middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/contact", contactRouter);

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
