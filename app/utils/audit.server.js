let securityEvents = [];

export function logSecurityEvent(event, details = {}) {
  const timestamp = new Date().toISOString();

  const entry = {
    timestamp,
    event,
    details,
  };

  securityEvents.push(entry);
  console.log(`[VELTO-SECURITY] ${timestamp} — ${event}`, details);

  return entry;
}

export function getSecurityEvents() {
  return securityEvents.slice().reverse(); // dernier en premier
}
