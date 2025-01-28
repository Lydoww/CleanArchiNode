import request from "supertest";
import { pool } from "../../../src/infrastructure/config/db";
import {app, server} from "../../../src/infrastructure/config/server";

describe("Contact API - Integration Tests", () => {
  let createdContactId: number;

  afterAll(async () => {
    console.log("🔍 Nettoyage des tests : suppression des données...");
    await pool.query("DELETE FROM contacts WHERE email = 'test@example.com'");

    console.log("🔍 Fermeture du pool PostgreSQL...");
    await pool.end();

    console.log("🔍 Fermeture du serveur Express...");
    if (server) {
      server.close(); // Fermer le serveur
    }
    console.log("✅ Serveur fermé !");
  });

  it("✅ Devrait créer un contact (POST /contact)", async () => {
    const response = await request(app)
      .post("/contact")
      .send({
        name: "Test User",
        email: "test@example.com",
        phone: "123456789",
      })
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Test User");
    expect(response.body.email).toBe("test@example.com");

    createdContactId = response.body.id; // Stocker l'ID pour tester DELETE
  });

  it("✅ Devrait supprimer un contact (DELETE /contact/:id)", async () => {
    const response = await request(app)
      .delete(`/contact/${createdContactId}`)
      .expect(200);

    expect(response.body).toEqual({ message: "Contact deleted successfully" });
  });
});
