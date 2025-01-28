import { DeleteContact } from "../../../src/usecases/DeleteContact";
import { IContactRepository } from "../../../src/domain/interfaces/ContactRepository";

describe("DeleteContact - Unit Test", () => {
  const mockRepository: IContactRepository = {
    save: jest.fn(),
    delete: jest.fn(),
    // getAll: jest.fn(),
    // getById: jest.fn(),
  };

  it("✅ Devrait supprimer un contact avec succès", async () => {
    const deleteContact = new DeleteContact(mockRepository);
    
    await deleteContact.execute(1);
    
    expect(mockRepository.delete).toHaveBeenCalledWith(1);
    expect(mockRepository.delete).toHaveBeenCalledTimes(1);
  });
});
