import { IContactRepository } from "../domain/interfaces/ContactRepository";
import { Contact } from "../domain/entities/Contact";

export class GetContacts {
  constructor(private contactRepository: IContactRepository) {}

  async execute(): Promise<Contact[]> {
    const contacts = await this.contactRepository.getAll();
    if (!contacts || contacts.length === 0) {
      throw new Error("No contacts found");
    }
    return contacts;
  }
}
