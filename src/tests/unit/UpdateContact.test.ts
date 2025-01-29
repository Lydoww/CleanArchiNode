import { UpdateContact } from "../../../src/usecases/UpdateContact";
import { IContactRepository } from "../../domain/interfaces/ContactRepository";

describe("UpdateContact - Unit Test", () => {
  const mockRepository: IContactRepository = {
    getById: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    getAll: jest.fn(),
  };

  it("✅ Devrait mettre à jour un contact existant", async () => {
    mockRepository.getById = jest.fn().mockResolvedValue({
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123456789",
    });

    mockRepository.save = jest
      .fn()
      .mockImplementation((updatedContact) => updatedContact);

    const updateContact = new UpdateContact(mockRepository);
    const updated = await updateContact.execute(1, { name: "Jane Doe" });

    expect(updated.name).toBe("Jane Doe");
    expect(mockRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, name: "Jane Doe" })
    );
  });

  it("✅ Devrait lever une erreur si le contact n'existe pas", async () => {
    mockRepository.getById = jest.fn().mockResolvedValue(null);

    const updateContact = new UpdateContact(mockRepository);
    await expect(
      updateContact.execute(99, { name: "New Name" })
    ).rejects.toThrow("Contact not found");
  });

  it("✅ Devrait lever une erreur si l'email est invalide", async () => {
    mockRepository.getById = jest.fn().mockResolvedValue({
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123456789",
    });

    const updateContact = new UpdateContact(mockRepository);
    await expect(
      updateContact.execute(1, { email: "invalidEmail" })
    ).rejects.toThrow("Invalid email format");
  });
});
