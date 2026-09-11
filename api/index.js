import express from 'express';
import cors from 'cors';
import pool from './db.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- USERS API ---
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.post('/api/users', async (req, res) => {
  const { id, name, email, password } = req.body;
  try {
    await pool.query('INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)', [id, name, email, password]);
    res.json({ id, name, email, password });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.put('/api/users/:id', async (req, res) => {
  const { name, email } = req.body;
  try {
    await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, req.params.id]);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// --- PRODUCTS API ---
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.post('/api/products', async (req, res) => {
  const { id, name, categoryId, packing, referencePrice, sellingPrice, image } = req.body;
  try {
    await pool.query('INSERT INTO products (id, name, categoryId, packing, referencePrice, sellingPrice, image) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      [id, name, categoryId, packing, referencePrice, sellingPrice, image]);
    res.json(req.body);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.put('/api/products/:id', async (req, res) => {
  const { name, categoryId, packing, referencePrice, sellingPrice, image } = req.body;
  try {
    await pool.query('UPDATE products SET name=?, categoryId=?, packing=?, referencePrice=?, sellingPrice=?, image=? WHERE id=?', 
      [name, categoryId, packing, referencePrice, sellingPrice, image, req.params.id]);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM products WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// --- CATEGORIES API ---
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    res.json(rows);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.post('/api/categories', async (req, res) => {
  const { id, name } = req.body;
  try {
    await pool.query('INSERT INTO categories (id, name) VALUES (?, ?)', [id, name]);
    res.json(req.body);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    await pool.query('UPDATE categories SET name=? WHERE id=?', [req.body.name, req.params.id]);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM categories WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// --- ORDERS API ---
app.get('/api/orders', async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM orders ORDER BY date DESC');
    for (let order of orders) {
      const [items] = await pool.query('SELECT * FROM order_items WHERE orderId = ?', [order.id]);
      order.items = items;
    }
    res.json(orders);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.post('/api/orders', async (req, res) => {
  const { id, userId, customerName, customerPhone, customerLocation, totalValue, status, items } = req.body;
  try {
    await pool.query('INSERT INTO orders (id, userId, customerName, customerPhone, customerLocation, totalValue, status) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      [id, userId, customerName, customerPhone, customerLocation, totalValue, status || 'Pending']);
    
    if (items && items.length > 0) {
      for (const item of items) {
        await pool.query('INSERT INTO order_items (orderId, productId, name, packing, quantity, referencePrice) VALUES (?, ?, ?, ?, ?, ?)',
          [id, item.id || item.productId, item.name, item.packing, item.quantity, item.referencePrice]);
      }
    }
    res.json({ success: true });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.put('/api/orders/:id/status', async (req, res) => {
  try {
    await pool.query('UPDATE orders SET status=? WHERE id=?', [req.body.status, req.params.id]);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM orders WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// --- SETTINGS API ---
app.get('/api/settings', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM settings');
    const settingsObj = {};
    rows.forEach(r => settingsObj[r.setting_key] = JSON.parse(r.setting_value));
    res.json(settingsObj);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.post('/api/settings', async (req, res) => {
  const { key, value } = req.body;
  try {
    await pool.query('INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value=?', 
      [key, JSON.stringify(value), JSON.stringify(value)]);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Backend API running on http://localhost:${PORT}`);
  });
}

// --- VERCEL EXPORT ---
export default app;
