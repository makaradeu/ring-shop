const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all rings
router.get('/', (req, res) => {
  db.query('SELECT * FROM rings', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get single ring
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM rings WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

module.exports = router;