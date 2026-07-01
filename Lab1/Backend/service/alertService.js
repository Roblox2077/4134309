const { Alert } = require('../models/alert');
const { SystemStatus } = require('../models/systemStatus');
const { DEFAULT_STATUS } = require('../config');

let status = new SystemStatus({
  ...DEFAULT_STATUS,
  updatedAt: new Date().toISOString()
});

let alerts = [];

function getStatus() {
  return status.toJSON();
}

function updateStatus({ smokeDetected, flameDetected, severity }) {
  status = new SystemStatus({
    smokeDetected,
    flameDetected,
    severity,
    updatedAt: new Date().toISOString()
  });

  return status.toJSON();
}

function getAlerts() {
  return alerts.map((alert) => alert.toJSON());
}

function createAlert({ type, severity, message }) {
  const alert = new Alert({
    id: Date.now().toString(),
    type,
    severity,
    message,
    timestamp: new Date().toISOString()
  });

  alerts.unshift(alert);
  return alert.toJSON();
}

module.exports = {
  getStatus,
  updateStatus,
  getAlerts,
  createAlert
};
