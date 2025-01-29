import { IContactRepository } from "../domain/interfaces/ContactRepository";
import { Contact } from "../domain/entities/Contact";

export class UpdateContact {
  constructor(private contactRepository: IContactRepository) {}
  async execute(id: number, contactData: Partial<Contact>): Promise<Contact> {
    if (!id || id <= 0 || isNaN(id)) {
      throw new Error("Invalid contact ID");
    }
    const contact = await this.contactRepository.getById(id);
    if (!contact) {
      throw new Error("Contact not found");
    }

    if (contactData.email && !contactData.email.includes("@")) {
      throw new Error("Invalid email format");
    }
    const updatedContact = { ...contact, ...contactData };
    return this.contactRepository.save(updatedContact);
  }
}
