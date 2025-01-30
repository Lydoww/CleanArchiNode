import express from "express";
import { AuthController } from "../controllers/AuthController";
import { UserRepository } from "../../infrastructure/persistence/repositories/UserRepository";

const router = express.Router();
const userRepository = new UserRepository();
const authController = new AuthController(userRepository);

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));


export default router;
