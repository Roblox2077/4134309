class Alert {
  constructor({ id, type, severity, message, timestamp, resolved = false }) {
    this.id = id;
    this.type = type;
    this.severity = severity;
    this.message = message;
    this.timestamp = timestamp;
    this.resolved = resolved;
  }

  toJSON() {
    return {
      id: this.id,
      type: this.type,
      severity: this.severity,
      message: this.message,
      timestamp: this.timestamp,
      resolved: this.resolved
    };
  }
}

module.exports = { Alert };
