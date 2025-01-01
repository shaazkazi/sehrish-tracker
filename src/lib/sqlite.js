import sqlite3 from 'better-sqlite3';

const dbPath = process.env.NODE_ENV === 'production' 
  ? '/.netlify/db/growth.db'
  : ':memory:';

const db = sqlite3(dbPath);

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
