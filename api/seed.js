import pool from './db.js';
import { products, categories } from '../src/data.js';

async function seedData() {
  try {
    console.log("Seeding products...");
    for (const product of products) {
      await pool.query('INSERT IGNORE INTO products (id, name, categoryId, packing, referencePrice, sellingPrice, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [product.id, product.name, product.categoryId, product.packing || null, product.referencePrice, product.mrp || product.sellingPrice, product.image || '']);
    }

    console.log("Seeding categories...");
    for (const category of categories) {
      await pool.query('INSERT IGNORE INTO categories (id, name) VALUES (?, ?)',
        [category.id, category.name]);
    }

    console.log("Data seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
}

seedData();
