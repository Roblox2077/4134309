class SystemStatus {
  constructor({ smokeDetected, flameDetected, severity, updatedAt }) {
    this.smokeDetected = smokeDetected;
    this.flameDetected = flameDetected;
    this.severity = severity;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      smokeDetected: this.smokeDetected,
      flameDetected: this.flameDetected,
      severity: this.severity,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = { SystemStatus };
