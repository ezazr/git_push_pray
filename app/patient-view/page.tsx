"use client";

import { useState } from "react";

type Screen = "home" | "vitals" | "device";

export default function PatientView() {
  const [screen, setScreen] = useState<Screen>("home");

  const heartRate = 78;
  const spo2 = 98;
  const temperature = 36.7;

  return (
    <main className="wearable-page">
      <div className="wearable-demo-header">
        <div>
          <p className="eyebrow">PATIENT EXPERIENCE</p>
          <h1>SmartVitals Wearable</h1>
          <p>
            A simulated wearable interface designed for remote patient
            monitoring and virtual care.
          </p>
        </div>

        <span className="prototype-badge">SIMULATED PROTOTYPE</span>
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
                <span className="reading-number">{heartRate}</span>
                <span className="reading-unit">BPM</span>
                <span className="reading-label">HEART RATE</span>
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
                Readings shown here are simulated for feasibility testing.
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

      <p className="prototype-disclaimer">
        SmartVitals feasibility prototype. Values are simulated and are not
        intended for diagnosis or clinical decision-making.
      </p>
    </main>
  );
}