const express = require('express');
const router = express.Router();
const { getAlerts, createAlert } = require('../service/alertService');

router.get('/', (req, res) => {
  res.json(getAlerts());
});

router.post('/', (req, res) => {
  const { type, severity, message } = req.body;

  if (!type || !severity || !message) {
    return res.status(400).json({ message: 'type, severity and message are required' });
  }

  res.status(201).json(createAlert({ type, severity, message }));
});

module.exports = router;
