
"use client";

import { useEffect, useState } from "react";
import {
  getAuditEvents,
  saveAuditEvent,
  type AuditEvent,
} from "../lib/clinicalAudit";

type EscalationPriority = "Routine" | "Urgent";

const escalationReasons = [
  "Deteriorating vital signs",
  "Patient-reported symptoms",
  "Clinician concern",
  "Other",
];

export default function ClinicalActions({
  patientId,
  patientName,
  isCritical,
}: {
  patientId: string;
  patientName: string;
  isCritical: boolean;
}) {
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState("");

  const [acknowledged, setAcknowledged] = useState(false);
  const [events, setEvents] = useState<AuditEvent[]>([]);

  const [showEscalation, setShowEscalation] = useState(false);
  const [reason, setReason] = useState(escalationReasons[0]);
  const [priority, setPriority] =
    useState<EscalationPriority>("Urgent");
  const [escalationNote, setEscalationNote] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    function refreshEvents() {
      const patientEvents = getAuditEvents().filter(
        (event) => event.patientId === patientId
      );

      setEvents(patientEvents);

      setAcknowledged(
        patientEvents.some(
          (event) =>
            event.action === "ALERT_ACKNOWLEDGED"
        )
      );
    }

    refreshEvents();

    window.addEventListener(
      "smartvitals-audit-updated",
      refreshEvents
    );

    window.addEventListener("storage", refreshEvents);

    return () => {
      window.removeEventListener(
        "smartvitals-audit-updated",
        refreshEvents
      );

      window.removeEventListener(
        "storage",
        refreshEvents
      );
    };
  }, [patientId]);

  function recordAction(
    action: AuditEvent["action"],
    title: string,
    detail: string
  ): boolean {
    try {
      // saveAuditEvent dispatches an update event.
      // The useEffect listener refreshes events automatically.
      // Do not manually insert the same event into state.
      saveAuditEvent({
        patientId,
        actor: "Dr. Riley (demo clinician)",
        action,
        title,
        detail,
      });

      setError("");
      return true;
    } catch (err) {
      console.error(
        "SmartVitals audit save failed:",
        err
      );

      setError(
        err instanceof Error
          ? `Unable to save action: ${err.message}`
          : "Unable to save the action in this browser."
      );

      return false;
    }
  }

  function acknowledgeAlert() {
    if (acknowledged) return;

    const alreadyAcknowledged = getAuditEvents().some(
      (event) =>
        event.patientId === patientId &&
        event.action === "ALERT_ACKNOWLEDGED"
    );

    if (alreadyAcknowledged) {
      setAcknowledged(true);
      return;
    }

    const saved = recordAction(
      "ALERT_ACKNOWLEDGED",
      "Alert acknowledged",
      `${patientName}'s simulated alert was acknowledged.`
    );

    if (saved) {
      setAcknowledged(true);
    }
  }

  function saveNote() {
    const cleanedNote = note.trim();

    if (!cleanedNote) {
      setError("Please enter a clinical note.");
      return;
    }

    const saved = recordAction(
      "CLINICAL_NOTE_ADDED",
      "Clinical note added",
      cleanedNote
    );

    if (saved) {
      setNote("");
      setShowNote(false);
    }
  }

  function escalatePatient() {
    const cleanedNote = escalationNote.trim();

    if (!cleanedNote) {
      setError(
        "Please enter a note explaining the escalation."
      );
      return;
    }

    const saved = recordAction(
      "PATIENT_ESCALATED",
      "Patient escalated for review",
      `${priority} priority | ${reason} | ${cleanedNote}`
    );

    if (saved) {
      setShowEscalation(false);
      setEscalationNote("");
      setReason(escalationReasons[0]);
      setPriority("Urgent");
    }
  }

  return (
    <div className="clinical-actions-wrapper">
      <div className="clinical-action-buttons">
        <button
          type="button"
          className="secondary-action"
          onClick={() => {
            setShowNote((current) => !current);
            setError("");
          }}
        >
          {showNote
            ? "Cancel note"
            : "Add clinical note"}
        </button>

        {isCritical && (
          <button
            type="button"
            className={`acknowledge-action ${
              acknowledged ? "acknowledged" : ""
            }`}
            onClick={acknowledgeAlert}
            disabled={acknowledged}
          >
            {acknowledged
              ? "Alert acknowledged ✓"
              : "Acknowledge alert"}
          </button>
        )}

        <button
          type="button"
          className="escalate-action"
          onClick={() => {
            setShowEscalation((current) => !current);
            setError("");
          }}
        >
          {showEscalation
            ? "Cancel escalation"
            : "Escalate for review"}
        </button>
      </div>

      {showNote && (
        <div className="clinical-note-editor">
          <label htmlFor="clinical-note">
            Clinical note
          </label>

          <textarea
            id="clinical-note"
            rows={4}
            value={note}
            onChange={(event) =>
              setNote(event.target.value)
            }
            placeholder="Enter a simulated clinician observation..."
          />

          <button
            type="button"
            onClick={saveNote}
            disabled={!note.trim()}
          >
            Save note
          </button>
        </div>
      )}

      {showEscalation && (
        <div className="clinical-escalation-editor">
          <h3>Escalate patient for review</h3>

          <label htmlFor="escalation-reason">
            Reason
          </label>

          <select
            id="escalation-reason"
            value={reason}
            onChange={(event) =>
              setReason(event.target.value)
            }
          >
            {escalationReasons.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <label htmlFor="escalation-priority">
            Priority
          </label>

          <select
            id="escalation-priority"
            value={priority}
            onChange={(event) =>
              setPriority(
                event.target.value as EscalationPriority
              )
            }
          >
            <option value="Routine">Routine</option>
            <option value="Urgent">Urgent</option>
          </select>

          <label htmlFor="escalation-note">
            Clinical justification
          </label>

          <textarea
            id="escalation-note"
            rows={3}
            value={escalationNote}
            onChange={(event) =>
              setEscalationNote(event.target.value)
            }
            placeholder="Explain why this patient requires review..."
          />

          <button
            type="button"
            className="confirm-escalation"
            onClick={escalatePatient}
            disabled={!escalationNote.trim()}
          >
            Confirm escalation
          </button>
        </div>
      )}

      {error && (
        <p className="checkinError" role="alert">
          {error}
        </p>
      )}

      <div className="workflow-events">
        <div className="workflow-events-header">
          <span>Audit activity</span>
          <span>{events.length} events</span>
        </div>

        {events.length === 0 ? (
          <p className="audit-empty">
            No clinical actions recorded for this patient yet.
          </p>
        ) : (
          events.map((event) => (
            <div
              className="workflow-event"
              key={event.id}
            >
              <span className="workflow-event-dot" />

              <div>
                <strong>{event.title}</strong>

                <p>{event.detail}</p>

                <small>
                  {event.actor} •{" "}
                  {new Date(
                    event.timestamp
                  ).toLocaleString("en-AU")}
                </small>
              </div>
            </div>
          ))
        )}
      </div>

      <p className="workflow-prototype-note">
        Simulated clinical workflow. Audit records
        are stored in browser localStorage, not in
        a secure, tamper-resistant clinical audit system.
      </p>
    </div>
  );
}
