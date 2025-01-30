import { IUserRepository } from "../../domain/interfaces/UserRepository";
import { User } from "../../domain/entities/User";
import bcrypt from "bcrypt";

export class RegisterUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    username: string,
    email: string,
    password: string
  ): Promise<Omit<User, "password">> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new Error("Email already in use");

    // ✅ Hashage du mot de passe dans le Use Case (Clean Architecture)
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(undefined, username, email, hashedPassword);
    const newUser = await this.userRepository.create(user);

    // ✅ Ne retourne pas le mot de passe dans la réponse
    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }
}
