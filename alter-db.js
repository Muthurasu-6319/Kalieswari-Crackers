import pool from './api/db.js';

async function alterTable() {
  try {
    await pool.query('ALTER TABLE products ADD COLUMN isActive BOOLEAN DEFAULT TRUE;');
    console.log('Successfully added isActive column to products table.');
    process.exit(0);
  } catch (error) {
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.log('Column isActive already exists.');
      process.exit(0);
    }
    console.error('Error:', error);
    process.exit(1);
  }
}

alterTable();
