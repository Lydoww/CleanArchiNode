import { GetContacts } from "../../../src/usecases/GetContacts";
import { IContactRepository } from "../../domain/interfaces/ContactRepository";

describe("GetContacts - Unit Test", () => {
  const mockRepository: IContactRepository = {
    getAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    getById: jest.fn(),
  };

  it("✅ Devrait retourner une liste de contacts", async () => {
    mockRepository.getAll = jest
      .fn()
      .mockResolvedValue([
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          phone: "123456789",
        },
      ]);

    const getContacts = new GetContacts(mockRepository);
    const contacts = await getContacts.execute();

    expect(contacts.length).toBeGreaterThan(0);
    expect(contacts[0].name).toBe("John Doe");
  });

  it("✅ Devrait lever une erreur si aucun contact n'est trouvé", async () => {
    mockRepository.getAll = jest.fn().mockResolvedValue([]);

    const getContacts = new GetContacts(mockRepository);
    await expect(getContacts.execute()).rejects.toThrow("No contacts found");
  });
});
