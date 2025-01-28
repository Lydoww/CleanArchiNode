//  usecases/CreateContact.ts

import { IContactRepository } from "../domain/interfaces/ContactRepository";

export class DeleteContact {
  constructor(private contactRepository: IContactRepository) {}

  async execute(id: number): Promise<void> {
    await this.contactRepository.delete(id);
  }
}
