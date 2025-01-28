import { Request, Response } from "express";
import { CreateContact } from "../../usecases/CreateContact";
import { DeleteContact } from "../../usecases/DeleteContact";
import { ContactRepository } from "../../infrastructure/persistence/repositories/ContactRepository";

export class ContactController { // ✅ NE PAS mettre `export default`
  private createContact: CreateContact;
  private deleteContact: DeleteContact;

  constructor(contactRepository: ContactRepository) {
    this.createContact = new CreateContact(contactRepository);
    this.deleteContact = new DeleteContact(contactRepository);
  }

  async create(req: Request, res: Response) {
    try {
      const contact = await this.createContact.execute(req.body);
      res.status(201).json(contact);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
      await this.deleteContact.execute(id);
      res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
