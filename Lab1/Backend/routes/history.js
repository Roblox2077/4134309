const express = require('express');
const router = express.Router();
const { getAlerts } = require('../service/alertService');

router.get('/', (req, res) => {
  res.json(getAlerts());
});

module.exports = router;
