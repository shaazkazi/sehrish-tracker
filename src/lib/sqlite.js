import sqlite3 from 'better-sqlite3';

const db = sqlite3(':memory:'); // For in-memory database
// Or use a file: const db = sqlite3('growth.db');

// Create tables
db.exec(`
    CREATE TABLE IF NOT EXISTS growth_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      height REAL,
      weight REAL,
      createdAt TEXT
    )
  `);

export default db;
