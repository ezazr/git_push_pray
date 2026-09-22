"use client";

import { useState } from "react";

type EventItem = {
  id: number;
  title: string;
  detail: string;
};

export default function ClinicalActions({
  patientName,
  isCritical,
}: {
  patientName: string;
  isCritical: boolean;
}) {
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [events, setEvents] = useState<EventItem[]>([]);

  function acknowledgeAlert() {
    if (acknowledged) return;

    setAcknowledged(true);

    setEvents((current) => [
      {
        id: Date.now(),
        title: "Alert acknowledged",
        detail: `Dr. Riley acknowledged ${patientName}'s alert · Just now`,
      },
      ...current,
    ]);
  }

  function saveNote() {
    if (!note.trim()) return;

    setEvents((current) => [
      {
        id: Date.now(),
        title: "Clinical note added",
        detail: `${note.trim()} · Dr. Riley · Just now`,
      },
      ...current,
    ]);

    setNote("");
    setShowNote(false);
  }

  return (
    <div className="clinical-actions-wrapper">
      <div className="clinical-action-buttons">
        <button
          className="secondary-action"
          onClick={() => setShowNote((current) => !current)}
        >
          {showNote ? "Cancel note" : "Add clinical note"}
        </button>

        {isCritical && (
          <button
            className={`acknowledge-action ${
              acknowledged ? "acknowledged" : ""
            }`}
            onClick={acknowledgeAlert}
            disabled={acknowledged}
          >
            {acknowledged ? "Alert acknowledged ✓" : "Acknowledge alert"}
          </button>
        )}
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
            onChange={(event) => setNote(event.target.value)}
            placeholder="Enter clinician observation..."
          />

          <button
            onClick={saveNote}
            disabled={!note.trim()}
          >
            Save note
          </button>
        </div>
      )}

      {events.length > 0 && (
        <div className="workflow-events">
          <div className="workflow-events-header">
            <span>Recent clinical actions</span>
            <span>{events.length}</span>
          </div>

          {events.map((event) => (
            <div className="workflow-event" key={event.id}>
              <span className="workflow-event-dot" />

              <div>
                <strong>{event.title}</strong>
                <p>{event.detail}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="workflow-prototype-note">
        Prototype workflow only. Actions are stored temporarily in this
        browser session and do not update a clinical record.
      </p>
    </div>
  );
}