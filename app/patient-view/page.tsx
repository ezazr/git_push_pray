
"use client";

import { useState } from "react";
import {
  saveCheckin,
  type Severity,
  type Symptom,
} from "../../lib/checkins";

type Screen = "home" | "vitals" | "device";

const symptomOptions: Symptom[] = [
  "Feeling normal",
  "Shortness of breath",
  "Dizziness",
  "Chest discomfort",
  "Unusual fatigue",
];

export default function PatientView() {
  const [screen, setScreen] = useState<Screen>("home");
  const [symptom, setSymptom] = useState<Symptom>("Feeling normal");
  const [severity, setSeverity] = useState<Severity>("Mild");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // This demo patient is Sarah Miller (SV-1001).
  const patientId = "SV-1001";

  const heartRate = 78;
  const spo2 = 98;
  const temperature = 36.7;
  
function submitCheckin() {
  try {
    saveCheckin({
      id: `checkin-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      patientId,
      symptom,
      severity: symptom === "Feeling normal" ? "Mild" : severity,
      timestamp: new Date().toISOString(),
    });

    setSubmitted(true);
    setError("");
  } catch (error) {
    console.error("SmartVitals check-in save failed:", error);

    setSubmitted(false);
    setError(
      error instanceof Error
        ? `Unable to save check-in: ${error.message}`
        : "Unable to save check-in."
    );
  }
}

  

      

  return (
    <main className="wearable-page">
      <div className="wearable-demo-header">
        <div>
          <p className="eyebrow">PATIENT EXPERIENCE</p>
          <h1>SmartVitals Wearable</h1>
          <p>
            A function ssimulated wearable interface designed for remote
            patient monitoring and virtual care.
          </p>
        </div>

        <span className="prototype-badge">
          SIMULATED PROTOTYPE
        </span>
      </div>

      <div className="wearable-shell">
        <div className="wearable-screen">
          <header className="wearable-top">
            <span>SMARTVITALS</span>
            <span>82%</span>
          </header>

          {screen === "home" && (
            <>
              <div className="health-state">
                <span className="status-dot" />
                STABLE
              </div>

              <div className="primary-reading">
                <span className="reading-number">
                  {heartRate}
                </span>
                <span className="reading-unit">BPM</span>
                <span className="reading-label">
                  HEART RATE
                </span>
              </div>

              <div className="mini-vitals">
                <div>
                  <span>SpO₂</span>
                  <strong>{spo2}%</strong>
                </div>

                <div>
                  <span>Temperature</span>
                  <strong>{temperature}°</strong>
                </div>
              </div>

              <div className="sync-row">
                <span>Signal ●●●</span>
                <span>Synced now</span>
              </div>
            </>
          )}

          {screen === "vitals" && (
            <div className="wearable-detail">
              <p className="eyebrow">CURRENT READINGS</p>
              <h2>Your vitals</h2>

              <div className="detail-reading">
                <span>Heart rate</span>
                <strong>{heartRate} BPM</strong>
              </div>

              <div className="detail-reading">
                <span>Blood oxygen</span>
                <strong>{spo2}%</strong>
              </div>

              <div className="detail-reading">
                <span>Temperature</span>
                <strong>{temperature} °C</strong>
              </div>

              <p className="wearable-note">
                Readings shown here are simulated for
                feasibility testing.
              </p>
            </div>
          )}

          {screen === "device" && (
            <div className="wearable-detail">
              <p className="eyebrow">DEVICE</p>
              <h2>Connected</h2>

              <div className="detail-reading">
                <span>Battery</span>
                <strong>82%</strong>
              </div>

              <div className="detail-reading">
                <span>Signal</span>
                <strong>Good</strong>
              </div>

              <div className="detail-reading">
                <span>Last sync</span>
                <strong>Now</strong>
              </div>

              <div className="device-ok">
                Monitoring connection active
              </div>
            </div>
          )}

          <nav className="wearable-nav">
            <button
              className={screen === "home" ? "active" : ""}
              onClick={() => setScreen("home")}
            >
              Home
            </button>

            <button
              className={screen === "vitals" ? "active" : ""}
              onClick={() => setScreen("vitals")}
            >
              Vitals
            </button>

            <button
              className={screen === "device" ? "active" : ""}
              onClick={() => setScreen("device")}
            >
              Device
            </button>
          </nav>
        </div>
      </div>

      {/* Patient-reported symptom check-in */}
      <section className="checkinCard">
        <div className="checkinHeading">
          <div>
            <p className="eyebrow">PATIENT CHECK-IN</p>
            <h2>How are you feeling?</h2>
            <p>
              Share a simulated symptom report with
              your care team.
            </p>
          </div>

          <span className="checkinPatientId">
            Demo patient: {patientId}
          </span>
        </div>

        <div className="checkinOptions">
          {symptomOptions.map((option) => (
            <label
              key={option}
              className={`checkinOption ${
                symptom === option ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="symptom"
                checked={symptom === option}
                onChange={() => {
                  setSymptom(option);
                  setSubmitted(false);
                }}
              />
              {option}
            </label>
          ))}
        </div>

        {symptom !== "Feeling normal" && (
          <div className="checkinSeverity">
            <label htmlFor="symptomSeverity">
              How severe is the symptom?
            </label>

            <select
              id="symptomSeverity"
              value={severity}
              onChange={(event) => {
                setSeverity(
                  event.target.value as Severity
                );
                setSubmitted(false);
              }}
            >
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </select>
          </div>
        )}

        <button
          type="button"
          className="checkinSubmit"
          onClick={submitCheckin}
        >
          Submit check-in
        </button>

        {submitted && (
          <div className="checkinSuccess" role="status">
            ✓ Demo check-in saved successfully.
            Open Sarah Miller&apos;s clinician page
            to view the report.
          </div>
        )}

        {error && (
          <p className="checkinError" role="alert">
            {error}
          </p>
        )}

        <p className="checkinDisclaimer">
          Demonstration only. Reports are stored locally
          in this browser and are not transmitted to a
          real care team or healthcare service.
        </p>
      </section>

      <p className="prototype-disclaimer">
        SmartVitals feasibility prototype. Values are
        simulated and are not intended for diagnosis
        or clinical decision-making.
      </p>
    </main>
  );
}
