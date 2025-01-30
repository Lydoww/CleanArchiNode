//  usecases/CreateContact.ts

import { IContactRepository } from "../../domain/interfaces/ContactRepository";

export class DeleteContact {
  constructor(private contactRepository: IContactRepository) {}

  async execute(id: number): Promise<void> {
    if (isNaN(id) || id <= 0) {
      throw new Error("Invalid ID"); 
    }
    await this.contactRepository.delete(id);
  }
}
