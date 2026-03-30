const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const normalizeDatabaseUrl = (databaseUrl) => {
  if (!databaseUrl) return databaseUrl;

  // Keep current secure behavior and silence pg sslmode deprecation warning.
  return databaseUrl.replace(/sslmode=(?:prefer|require|verify-ca)\b/i, 'sslmode=verify-full');
};

async function patchDB() {
  const client = new Client({
    connectionString: normalizeDatabaseUrl(process.env.DATABASE_URL),
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Connected to Neon DB.");
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS notification_log (
        id SERIAL PRIMARY KEY,
        tugas_id INT REFERENCES tugas(id) ON DELETE CASCADE,
        sent_at_date DATE NOT NULL,
        UNIQUE(tugas_id, sent_at_date)
      );
    `);
    
    console.log("Patch successful!");
  } catch (error) {
    console.error("Patch failed:", error);
  } finally {
    await client.end();
  }
}

patchDB();
