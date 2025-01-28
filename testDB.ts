import { pool } from "./src/infrastructure/config/db";

const testConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Connexion à PostgreSQL réussie :", res.rows[0]);
  } catch (error) {
    console.error("❌ Erreur de connexion à PostgreSQL :", error);
  }
};

testConnection();
