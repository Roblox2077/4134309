const express = require('express');
const router = express.Router();
const { getStatus, updateStatus } = require('../service/alertService');

router.get('/', (req, res) => {
  res.json(getStatus());
});

router.post('/', (req, res) => {
  const { smokeDetected, flameDetected, severity } = req.body;

  if (typeof smokeDetected !== 'boolean' || typeof flameDetected !== 'boolean') {
    return res.status(400).json({ message: 'smokeDetected and flameDetected must be booleans' });
  }

  res.json(updateStatus({ smokeDetected, flameDetected, severity }));
});

module.exports = router;
