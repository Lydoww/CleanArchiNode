// src/application/routes/ContactRoutes.ts

import express from "express";
import { ContactController } from "../controllers/ContactController";
import { ContactRepository } from "../../infrastructure/persistence/repositories/ContactRepository";

const router = express.Router();
const contactRepository = new ContactRepository();
const contactController = new ContactController(contactRepository);

router.post("/", (req, res) => contactController.create(req, res));
router.delete("/:id", (req, res) => contactController.delete(req, res));

export default router; // ✅ On exporte le `router`, et non `ContactController`
