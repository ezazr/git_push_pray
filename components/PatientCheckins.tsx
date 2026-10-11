
"use client";

import { useEffect, useState } from "react";
import {
  getCheckins,
  type PatientCheckin,
} from "../lib/checkins";

export default function PatientCheckins({
  patientId,
}: {
  patientId: string;
}) {
  const [checkins, setCheckins] = useState<PatientCheckin[]>([]);

  useEffect(() => {
    function refresh() {
      const records = getCheckins();

      setCheckins(
        records.filter(
          (record) => record.patientId === patientId
        )
      );
    }

    refresh();

    window.addEventListener("storage", refresh);
    window.addEventListener(
      "smartvitals-checkin-updated",
      refresh
    );

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(
        "smartvitals-checkin-updated",
        refresh
      );
    };
  }, [patientId]);

  return (
    <section className="checkinClinicianCard">
      <div className="checkinHeading">
        <div>
          <p className="eyebrow">
            PATIENT-REPORTED INFORMATION
          </p>

          <h2>Symptom check-ins</h2>

          <p>
            Patient-submitted demonstration reports
          </p>
        </div>

        <span className="checkinPatientId">
          {checkins.length} reports
        </span>
      </div>

      {checkins.length === 0 ? (
        <p className="checkinEmpty">
          No symptom check-ins recorded for this patient
          in the current browser.
        </p>
      ) : (
        <div className="checkinHistory">
          {checkins.slice(0, 5).map((checkin) => (
            <div
              className="checkinHistoryItem"
              key={checkin.id}
            >
              <div>
                <strong>{checkin.symptom}</strong>
                <p>Severity: {checkin.severity}</p>
              </div>

              <span>
                {new Date(
                  checkin.timestamp
                ).toLocaleString("en-AU")}
              </span>
            </div>
          ))}
        </div>
      )}

      <p className="checkinDisclaimer">
        These reports are synthetic prototype inputs
        stored in browser localStorage. They are not
        verified clinical observations.
      </p>
    </section>
  );
}
