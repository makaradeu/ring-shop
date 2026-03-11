const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashed],
    (err, result) => {
      if (err) return res.status(400).json({ error: 'Email already exists' });
      res.json({ message: 'Registered successfully!' });
    }
  );
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (results.length === 0) return res.status(400).json({ error: 'User not found' });
    const match = await bcrypt.compare(password, results[0].password);
    if (!match) return res.status(400).json({ error: 'Wrong password' });
    const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET);
    res.json({ token, user: results[0] });
  });
});

module.exports = router;