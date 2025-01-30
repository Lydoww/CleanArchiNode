import express from "express";
import { RequestHandler } from "express";
import { ContactController } from "../controllers/ContactController";
import { ContactRepository } from "../../infrastructure/persistence/repositories/ContactRepository";

const router = express.Router();
const contactRepository = new ContactRepository();
const contactController = new ContactController(contactRepository);

// ✅ Correction : Ajout de `async` dans les callbacks des routes
router.post("/", async (req, res) => await contactController.create(req, res));
router.delete(
  "/:id",
  async (req, res) => await contactController.delete(req, res)
);
router.get(
  "/",
  async (req, res) => await contactController.getAllContacts(req, res)
);
router.put("/:id", (async (req, res) => {
  await contactController.update(req, res);
}) as RequestHandler);
export default router;
