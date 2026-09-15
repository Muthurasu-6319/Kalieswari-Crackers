import pool from './db.js';

async function initDb() {
  try {
    console.log("Connecting to TiDB and initializing schemas...");

    // Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Users table ready.");

    // Products Table
    await pool.query(`DROP TABLE IF EXISTS products`);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        categoryId VARCHAR(255) NOT NULL,
        packing VARCHAR(255),
        referencePrice INT NOT NULL,
        sellingPrice INT NOT NULL,
        image VARCHAR(1000),
        isActive BOOLEAN DEFAULT TRUE
      )
    `);
    console.log("Products table ready.");

    // Categories Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      )
    `);
    console.log("Categories table ready.");

    // Settings Table (Key-Value)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS settings (
        setting_key VARCHAR(255) PRIMARY KEY,
        setting_value JSON
      )
    `);
    console.log("Settings table ready.");

    // Orders Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(255) PRIMARY KEY,
        userId VARCHAR(255),
        customerName VARCHAR(255) NOT NULL,
        customerPhone VARCHAR(255),
        customerLocation VARCHAR(255),
        totalValue INT NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Orders table ready.");

    // Order Items Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        orderId VARCHAR(255) NOT NULL,
        productId VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        packing VARCHAR(255),
        quantity INT NOT NULL,
        referencePrice INT NOT NULL,
        FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE
      )
    `);
    console.log("Order items table ready.");

    console.log("✅ Database schema initialization complete!");
    process.exit(0);

  } catch (error) {
    console.error("❌ Error initializing database:", error);
    process.exit(1);
  }
}

initDb();
