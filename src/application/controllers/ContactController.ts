// src/application/controllers/ContactController.ts

import { Request, Response } from "express";
import { CreateContact } from "../../usecases/ContactCase/CreateContact";
import { DeleteContact } from "../../usecases/ContactCase/DeleteContact";
import { ContactRepository } from "../../infrastructure/persistence/repositories/ContactRepository";
import { GetContacts } from "../../usecases/ContactCase/GetContacts";
import { UpdateContact } from "../../usecases/ContactCase/UpdateContact";

export class ContactController {
  private createContact: CreateContact;
  private deleteContact: DeleteContact;
  private getContacts: GetContacts;
  private updateContact: UpdateContact;

  constructor(contactRepository: ContactRepository) {
    this.createContact = new CreateContact(contactRepository);
    this.deleteContact = new DeleteContact(contactRepository);
    this.getContacts = new GetContacts(contactRepository);
    this.updateContact = new UpdateContact(contactRepository);
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

  async getAllContacts(req: Request, res: Response) {
    try {
      const contacts = await this.getContacts.execute();
      res.status(200).json(contacts);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  // ✅ Ajout de `updateContact()`
  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      const updatedContact = await this.updateContact.execute(id, req.body);
      res.status(200).json(updatedContact);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
