// routes/user.routes.js
const express = require('express');
const router = express.Router();

// GET route
router.get('/', (req, res) => {
  res.json({ message: 'All users list' });
});

// POST route
router.post('/', (req, res) => {
  const { name } = req.body;
  res.json({ message: `User ${name} created` });
});

module.exports = router;
