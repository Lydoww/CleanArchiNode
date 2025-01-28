import { ContactRepository } from "../infrastructure/persistence/repositories/ContactRepository";
import { Contact } from "../domain/entities/Contact";

export class CreateContact {
  constructor(private contactRepository: ContactRepository) {}

  async execute(contactData: Omit<Contact, "id">): Promise<Contact> {
    const contact = new Contact(
      null as any, // On laisse PostgreSQL générer l'ID
      contactData.name,
      contactData.email,
      contactData.phone
    );
    return this.contactRepository.save(contact);
  }
}
