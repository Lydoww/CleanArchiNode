import { Contact } from "../entities/Contact";

export interface IContactRepository {
  save(contact: Contact): Promise<Contact>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Contact[]>;
  getById(id: number): Promise<Contact | null>;
}
