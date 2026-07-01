module.exports = {
  PORT: process.env.PORT || 3001,
  DEFAULT_STATUS: {
    smokeDetected: false,
    flameDetected: false,
    severity: 'normal'
  }
};
