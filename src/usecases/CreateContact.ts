// usecases/CreateContact.ts

import { IContactRepository } from "../domain/interfaces/ContactRepository";
import { Contact } from "../domain/entities/Contact";

export class CreateContact {
  constructor(private contactRepository: IContactRepository) {}

  async execute(contactData: Omit<Contact, "id">): Promise<Contact> {
    return this.contactRepository.save(
      new Contact(0, contactData.name, contactData.email, contactData.phone)
    );
  }
}
