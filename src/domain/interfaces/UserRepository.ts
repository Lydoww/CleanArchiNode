import { User } from "../entities/User";

export interface IUserRepository {
    create(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(userId: number): Promise<Omit<User, "password"> | null>; // ✅ On omet le password
    update(userId: number, data: { username?: string; email?: string }): Promise<Omit<User, "password">>; // ✅ On omet le password
}
