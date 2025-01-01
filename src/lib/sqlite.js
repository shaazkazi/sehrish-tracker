import sqlite3 from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'growth.db');
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