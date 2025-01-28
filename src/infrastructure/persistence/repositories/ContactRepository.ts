// persistence/repositories/ContactRepository.ts

import { pool } from "../../config/db";
import { Contact } from "../../../domain/entities/Contact";
import { IContactRepository } from "../../../domain/interfaces/ContactRepository";

export class ContactRepository implements IContactRepository {
  async save(contact: Contact): Promise<Contact> {
    try {
      const result = await pool.query(
        "INSERT INTO contacts (name, email, phone) VALUES ($1, $2, $3) RETURNING *",
        [contact.name, contact.email, contact.phone]
      );
      return new Contact(
        result.rows[0].id,
        result.rows[0].name,
        result.rows[0].email,
        result.rows[0].phone
      );
    } catch (error: any) {
      console.error("Database error:", error);
      throw new Error("Could not save contact");
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await pool.query("DELETE FROM contacts WHERE id = $1", [id]);
    } catch (error: any) {
      console.error("database error:", error);
      throw new Error("Could not delete contact");
    }
  }
}
