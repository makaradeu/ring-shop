const express = require('express');
const router = express.Router();
const db = require('../db');

// Place an order
router.post('/', (req, res) => {
  const { user_id, ring_id, message } = req.body;
  db.query(
    'INSERT INTO orders (user_id, ring_id, message) VALUES (?, ?, ?)',
    [user_id, ring_id, message],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Order placed successfully! 💍' });
    }
  );
});

// Get orders by user
router.get('/:user_id', (req, res) => {
  db.query(
    'SELECT orders.*, rings.name, rings.price FROM orders JOIN rings ON orders.ring_id = rings.id WHERE orders.user_id = ?',
    [req.params.user_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

module.exports = router;