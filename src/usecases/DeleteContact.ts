//  usecases/CreateContact.ts

import { ContactRepository } from "../infrastructure/persistence/repositories/ContactRepository";

export class DeleteContact {
  constructor(private contactRepository: ContactRepository) {}

  async execute(id: number): Promise<void> {
    await this.contactRepository.delete(id);
  }
}
