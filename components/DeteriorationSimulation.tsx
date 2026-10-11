
"use client";

import { useEffect, useState } from "react";
import VitalCard from "./VitalCard";
import DeteriorationPanel from "./DeteriorationPanel";

type Reading = {
  hr: number;
  spo2: number;
  temp: number;
};

const stages: Reading[] = [
  { hr: 76, spo2: 97, temp: 36.7 },
  { hr: 82, spo2: 95, temp: 36.8 },
  { hr: 89, spo2: 93, temp: 37.0 },
  { hr: 96, spo2: 91, temp: 37.2 },
  { hr: 101, spo2: 89, temp: 37.4 },
  { hr: 104, spo2: 87, temp: 37.6 },
];

export default function DeteriorationSimulation({
  signal,
  battery,
}: {
  signal: number;
  battery: number;
}) {
  const [stage, setStage] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || stage >= stages.length - 1) return;

    const timer = setTimeout(() => {
      setStage((current) => current + 1);
    }, 2500);

    return () => clearTimeout(timer);
  }, [running, stage]);

  const reading = stages[stage];

  const status =
    stage >= 4 ? "HIGH PRIORITY" :
    stage >= 2 ? "WARNING" :
    "STABLE";

  function reset() {
    setRunning(false);
    setStage(0);
  }

  return (
    <div>
      <section className="simulationCard">
        <div className="simulationHeader">
          <div>
            <span className="deteriorationLabel">
              SMARTVITALS LIVE DEMONSTRATION
            </span>
            <h2>Patient deterioration simulation</h2>
            <p>
              Watch synthetic wearable readings progress through
              a predefined deterioration scenario.
            </p>
          </div>

          <span className={`simulationStatus ${
            status === "HIGH PRIORITY" ? "simHigh" :
            status === "WARNING" ? "simWarning" : "simStable"
          }`}>
            {status}
          </span>
        </div>

        <div className="simulationProgress">
          {stages.map((_, index) => (
            <div
              key={index}
              className={`simulationStep ${
                index <= stage ? "simulationStepActive" : ""
              }`}
            />
          ))}
        </div>

        <p className="simulationStage">
          Reading {stage + 1} of {stages.length}
          {stage === stages.length - 1 && " — Scenario complete"}
        </p>

        <div className="simulationControls">
          <button
            className="simStartBtn"
            onClick={() => setRunning(true)}
            disabled={running || stage === stages.length - 1}
          >
            {running ? "Simulation running..." : "Start simulation"}
          </button>

          <button
            className="simNextBtn"
            onClick={() => {
              setRunning(false);
              setStage((current) =>
                Math.min(current + 1, stages.length - 1)
              );
            }}
            disabled={stage === stages.length - 1}
          >
            Next reading
          </button>

          <button className="simResetBtn" onClick={reset}>
            Reset
          </button>
        </div>

        <p className="simulationDisclaimer">
          Synthetic data only. This simulation does not represent
          a real patient or a clinically validated detection system.
        </p>
      </section>

      <DeteriorationPanel
        hr={reading.hr}
        spo2={reading.spo2}
        signal={signal}
      />

      <div className="vitalsGrid">
        <VitalCard
          label="Heart rate"
          value={reading.hr}
          unit="BPM"
          hint="Simulated reading"
          tone={reading.hr > 100 ? "critical" : "good"}
        />
        <VitalCard
          label="SpO₂"
          value={reading.spo2}
          unit="%"
          hint="Simulated oxygen saturation"
          tone={reading.spo2 < 92 ? "critical" : "good"}
        />
        <VitalCard
          label="Temperature"
          value={reading.temp}
          unit="°C"
          hint="Simulated skin temperature"
          tone={reading.temp >= 38 ? "warning" : "neutral"}
        />
        <VitalCard
          label="Device battery"
          value={battery}
          unit="%"
          hint="Simulated device battery"
          tone={battery < 50 ? "warning" : "good"}
        />
      </div>
    </div>
  );
}
