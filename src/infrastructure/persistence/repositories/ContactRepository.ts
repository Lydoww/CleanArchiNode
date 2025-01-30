import { IContactRepository } from "../../../domain/interfaces/ContactRepository";
import { Contact } from "../../../domain/entities/Contact";
import { pool } from "../../config/db";

export class ContactRepository implements IContactRepository {
  async save(contact: Contact): Promise<Contact> {
    const { name, email, phone } = contact;

    const result = await pool.query(
      `INSERT INTO contacts (name, email, phone) 
       VALUES ($1, $2, $3) 
       RETURNING id, name, email, phone`,
      [name, email, phone]
    );

    return result.rows[0];
  }

  async delete(id: number): Promise<void> {
    await pool.query(`DELETE FROM contacts WHERE id = $1`, [id]);
  }

  // ✅ 1️⃣ Ajout de `getAll()`
  async getAll(): Promise<Contact[]> {
    const result = await pool.query(`SELECT * FROM contacts`);
    return result.rows;
  }

  // ✅ 2️⃣ Ajout de `getById()`
  async getById(id: number): Promise<Contact | null> {
    const result = await pool.query(`SELECT * FROM contacts WHERE id = $1`, [id]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
}
