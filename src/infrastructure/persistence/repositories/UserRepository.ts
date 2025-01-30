import { IUserRepository } from "../../../domain/interfaces/UserRepository";
import { User } from "../../../domain/entities/User";
import { pool } from "../../config/db";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const { username, email, password } = user;

    const result = await pool.query(
      `INSERT INTO users (username, email, password) 
       VALUES ($1, $2, $3) 
       RETURNING id, username, email, created_at, updated_at`,
      [username, email, password]
    );

    const newUser = result.rows[0];

    return new User(
      newUser.id,
      newUser.username,
      newUser.email,
      user.password, // ✅ Déjà hashé avant d'arriver ici
      newUser.created_at,
      newUser.updated_at
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) return null;

    const user = result.rows[0];

    return new User(
      user.id,
      user.username,
      user.email,
      user.password,
      user.created_at,
      user.updated_at
    );
  }

  // ✅ 1️⃣ `findById()` sans mettre `"HIDDEN_PASSWORD"`
  async findById(userId: number): Promise<Omit<User, "password"> | null> {
    const result = await pool.query(
      `SELECT id, username, email, created_at, updated_at 
       FROM users WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) return null;
    const user = result.rows[0];

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    }; // ✅ On ne retourne **pas** de User contenant "HIDDEN_PASSWORD"
  }

  // ✅ 2️⃣ `update()` sans stocker `"HIDDEN_PASSWORD"`
  async update(userId: number, data: { username?: string; email?: string }): Promise<Omit<User, "password">> {
    const result = await pool.query(
      `UPDATE users 
       SET username = COALESCE($1, username), 
           email = COALESCE($2, email), 
           updated_at = NOW() 
       WHERE id = $3 
       RETURNING id, username, email, created_at, updated_at`,
      [data.username, data.email, userId]
    );

    if (result.rows.length === 0) throw new Error("User not found");

    const user = result.rows[0];
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    }; // ✅ On retourne un objet **sans password**
  }
}
