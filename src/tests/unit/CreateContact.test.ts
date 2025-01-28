import { CreateContact } from "../../../src/usecases/CreateContact";
import { Contact } from "../../../src/domain/entities/Contact";

describe("CreateContact - Unit Test", () => {
  const mockRepository = {
    save: jest.fn(async (contact: Contact) => ({
      ...contact,
      id: 1, 
    })),
  };

  it("✅ Devrait créer un contact avec succès", async () => {
    const useCase = new CreateContact(mockRepository as any);
    const contactData = {
      name: "Test User",
      email: "test@example.com",
      phone: "123456789",
    };

    const result = await useCase.execute(contactData);
    expect(result).toHaveProperty("id");
    expect(result.name).toBe("Test User");
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });
});
