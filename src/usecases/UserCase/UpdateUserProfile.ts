import { IUserRepository } from "../../domain/interfaces/UserRepository";
import { User } from "../../domain/entities/User";

export class UpdateUserProfile {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: number, data: { username?: string; email?: string }): Promise<Omit<User, "password">> {
    const updatedUser = await this.userRepository.update(userId, data);

    return {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    };
  }
}
