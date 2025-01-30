import { IUserRepository } from "../../domain/interfaces/UserRepository";
import { User } from "../../domain/entities/User";

export class GetUserProfile {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: number): Promise<Omit<User, "password"> | null> {
    const user = await this.userRepository.findById(userId);
    if (!user) return null;

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}
