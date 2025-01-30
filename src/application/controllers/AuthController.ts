import { Request, Response } from "express";
import { RegisterUser } from "../../usecases/AuthCase/RegisterUser";
import { LoginUser } from "../../usecases/AuthCase/LoginUser";
import { IUserRepository } from "../../domain/interfaces/UserRepository";

export class AuthController {
  private registerUser: RegisterUser;
  private loginUser: LoginUser;

  constructor(userRepository: IUserRepository) {
    this.registerUser = new RegisterUser(userRepository);
    this.loginUser = new LoginUser(userRepository);
  }

  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const user = await this.registerUser.execute(username, email, password);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const tokens = await this.loginUser.execute(email, password);
      res.status(200).json(tokens);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}
