
export type Symptom =
  | "Feeling normal"
  | "Shortness of breath"
  | "Dizziness"
  | "Chest discomfort"
  | "Unusual fatigue";

export type Severity = "Mild" | "Moderate" | "Severe";

export type PatientCheckin = {
  id: string;
  patientId: string;
  symptom: Symptom;
  severity: Severity;
  timestamp: string;
};

const STORAGE_KEY = "smartvitals-patient-checkins";

export function getCheckins(): PatientCheckin[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed)
      ? (parsed as PatientCheckin[])
      : [];
  } catch {
    return [];
  }
}

export function saveCheckin(
  checkin: PatientCheckin
): void {
  const existing = getCheckins();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([checkin, ...existing].slice(0, 50))
  );

  window.dispatchEvent(new Event("smartvitals-checkin-updated"));
}
