"use client";

import { useEffect, useState } from "react";

export default function LiveVitals() {
  const [heartRate, setHeartRate] = useState(76);
  const [spo2, setSpo2] = useState(98);
  const [temperature, setTemperature] = useState(36.7);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(Math.floor(Math.random() * 8) + 72);
      setSpo2(Math.floor(Math.random() * 3) + 97);
      setTemperature(Number((36.5 + Math.random() * 0.5).toFixed(1)));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <h2>Live Vital Signs</h2>

      <p>
        Simulated patient monitoring data for the SmartVitals feasibility
        prototype.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginTop: "24px",
        }}
      >
        <VitalBox
          title="Heart Rate"
          value={`${heartRate} BPM`}
          status="Monitoring"
        />

        <VitalBox
          title="SpO₂"
          value={`${spo2}%`}
          status="Monitoring"
        />

        <VitalBox
          title="Temperature"
          value={`${temperature} °C`}
          status="Monitoring"
        />
      </div>

      <p
        style={{
          marginTop: "20px",
          fontSize: "13px",
          opacity: 0.7,
        }}
      >
        Prototype only — values are simulated and are not clinical measurements.
      </p>
    </section>
  );
}

function VitalBox({
  title,
  value,
  status,
}: {
  title: string;
  value: string;
  status: string;
}) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "14px",
        padding: "20px",
        background: "#ffffff",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "14px",
          opacity: 0.7,
        }}
      >
        {title}
      </p>

      <h3
        style={{
          margin: "10px 0",
          fontSize: "28px",
        }}
      >
        {value}
      </h3>

      <span
        style={{
          fontSize: "12px",
          fontWeight: 600,
        }}
      >
        ● {status}
      </span>
    </div>
  );
}