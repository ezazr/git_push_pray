
export type AuditAction =
  | "ALERT_ACKNOWLEDGED"
  | "CLINICAL_NOTE_ADDED"
  | "PATIENT_ESCALATED";

export type AuditEvent = {
  id: string;
  patientId: string;
  actor: string;
  action: AuditAction;
  title: string;
  detail: string;
  timestamp: string;
};

const STORAGE_KEY = "smartvitals-clinical-audit";

export function getAuditEvents(): AuditEvent[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);

    return Array.isArray(parsed)
      ? (parsed as AuditEvent[])
      : [];
  } catch {
    return [];
  }
}

export function saveAuditEvent(
  event: Omit<AuditEvent, "id" | "timestamp">
): AuditEvent {
  const newEvent: AuditEvent = {
    ...event,
    id: `audit-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 9)}`,
    timestamp: new Date().toISOString(),
  };

  const existing = getAuditEvents();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([newEvent, ...existing].slice(0, 100))
  );

  window.dispatchEvent(
    new Event("smartvitals-audit-updated")
  );

  return newEvent;
}
