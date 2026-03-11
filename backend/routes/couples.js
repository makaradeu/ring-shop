const express = require('express');
const router = express.Router();
const db = require('../db');

// Link two users as a couple
router.post('/link', (req, res) => {
  const { user1_id, user2_id, anniversary_date } = req.body;
  db.query(
    'INSERT INTO couples (user1_id, user2_id, anniversary_date) VALUES (?, ?, ?)',
    [user1_id, user2_id, anniversary_date],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Couple linked successfully! 💍' });
    }
  );
});

// Get couple info
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM couples WHERE user1_id = ? OR user2_id = ?',
    [req.params.id, req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results[0]);
    }
  );
});

module.exports = router;