import express from "express"
import { RequestHandler, NextFunction } from "express";
import { authMiddleware } from "../../infrastructure/middlewares/authMiddleware";
import { UserController } from "../controllers/UserController";
import { UserRepository } from "../../infrastructure/persistence/repositories/UserRepository";

const router = express.Router();
const userRepository = new UserRepository();
const userController = new UserController(userRepository);

// ✅ Récupérer son propre profil (protégé)
router.get("/me", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    await userController.getProfile(req, res);
  }) as RequestHandler;
// ✅ Modifier son profil (protégé)
router.put("/me", authMiddleware, userController.updateProfile.bind(userController));


export default router;