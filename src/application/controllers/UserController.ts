import { Request, Response } from "express";
import { IUserRepository } from "../../domain/interfaces/UserRepository";
import { GetUserProfile } from "../../usecases/UserCase/GetUserProfile";
import { UpdateUserProfile } from "../../usecases/UserCase/UpdateUserProfile";

export class UserController {
  private getUserProfileUseCase: GetUserProfile;
  private updateUserProfileUseCase: UpdateUserProfile;

  constructor(userRepository: IUserRepository) {
    this.getUserProfileUseCase = new GetUserProfile(userRepository);
    this.updateUserProfileUseCase = new UpdateUserProfile(userRepository);
  }

  async getProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const user = await this.getUserProfileUseCase.execute(userId);

      if (!user) return res.status(404).json({ error: "User not found" });

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const { username, email } = req.body;

      const updatedUser = await this.updateUserProfileUseCase.execute(userId, { username, email });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
