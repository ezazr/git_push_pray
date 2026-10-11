
import Link from "next/link";
import Shell from "../../../components/Shell";
import VitalCard from "../../../components/VitalCard";
import TrendChart from "../../../components/TrendChart";
import ClinicalActions from "../../../components/ClinicalActions";
import DeteriorationPanel from "../../../components/DeteriorationPanel";
import DeteriorationSimulation from "../../../components/DeteriorationSimulation";
import { patients } from "../../../lib/data";

export default async function PatientDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const patient = patients.find((p) => p.id === id) || patients[0];
  const critical = patient.status === "Critical";

  // Only Sarah Miller uses the interactive deterioration scenario.
  const isSimulationPatient = patient.id === "SV-1001";

  return (
    <Shell>
      <section className="content">

        {/* Back navigation */}
        <Link href="/dashboard" className="backLink">
          ← Back to dashboard
        </Link>

        {/* Patient header */}
        <div className="patientHeader">
          <div className="patientTitle">
            <div className="avatar patientAvatar">
              {patient.name
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </div>

            <div>
              <div className="titleLine">
                <h1>{patient.name}</h1>

                <span
                  className={`statusPill ${patient.status.toLowerCase()}`}
                >
                  {patient.status}
                </span>
              </div>

              <p>
                {patient.id} • {patient.age} years • VVED remote monitoring
              </p>
            </div>
          </div>

          {/* Clinical note and alert acknowledgement */}
          <ClinicalActions
            patientName={patient.name}
            isCritical={critical}
          />
        </div>

        {/* Live deterioration simulation for Sarah Miller */}
        {isSimulationPatient ? (
          <DeteriorationSimulation
            signal={patient.signal}
            battery={patient.battery}
          />
        ) : (
          <>
            {/* Baseline intelligence for other patients */}
            <DeteriorationPanel
              hr={patient.hr}
              spo2={patient.spo2}
              signal={patient.signal}
            />

            {/* Standard patient vital signs */}
            <div className="vitalsGrid">
              <VitalCard
                label="Heart rate"
                value={patient.hr}
                unit="BPM"
                hint="Current simulated reading"
                tone={patient.hr > 120 ? "critical" : "good"}
              />

              <VitalCard
                label="SpO₂"
                value={patient.spo2}
                unit="%"
                hint="Simulated blood oxygen"
                tone={patient.spo2 < 92 ? "critical" : "good"}
              />

              <VitalCard
                label="Temperature"
                value={patient.temp}
                unit="°C"
                hint="Simulated skin temperature"
                tone={patient.temp >= 38 ? "warning" : "neutral"}
              />

              <VitalCard
                label="Device battery"
                value={patient.battery}
                unit="%"
                hint="Simulated battery level"
                tone={patient.battery < 50 ? "warning" : "good"}
              />
            </div>
          </>
        )}

        {/* Simulated vital-sign trends */}
        <div className="chartsGrid">
          <TrendChart
            title="ECG / heart-rate trend"
            subtitle="Simulated signal trend"
          />

          <TrendChart
            title="SpO₂ trend"
            subtitle="Simulated oxygen saturation trend"
          />
        </div>

        {/* Device health and clinical events */}
        <div className="split detailSplit">

          {/* Device health */}
          <section className="card">
            <div className="cardHead">
              <div>
                <h3>Device health</h3>
                <p>Wearable patch telemetry (simulated)</p>
              </div>

              <span className="statusPill stable">
                Connected
              </span>
            </div>

            <div className="deviceGrid">
              <div>
                <span>PPG sensor</span>
                <b>Active (simulated)</b>
              </div>

              <div>
                <span>ECG sensor</span>
                <b>Active (simulated)</b>
              </div>

              <div>
                <span>Temperature</span>
                <b>Active (simulated)</b>
              </div>

              <div>
                <span>Signal quality</span>
                <b>{patient.signal}%</b>
              </div>

              <div>
                <span>Sampling target</span>
                <b>500 Hz (proposed)</b>
              </div>

              <div>
                <span>BLE connection</span>
                <b>Simulated</b>
              </div>
            </div>
          </section>

          {/* Recent events */}
          <section className="card">
            <div className="cardHead">
              <div>
                <h3>Recent events</h3>
                <p>Illustrative clinical and device activity</p>
              </div>
            </div>

            <div className="timeline">
              <div>
                <i className="dot red" />

                <p>
                  <strong>Low oxygen threshold detected</strong>
                  <span>
                    Sample event • simulated alert
                  </span>
                </p>
              </div>

              <div>
                <i className="dot green" />

                <p>
                  <strong>Device data synchronised</strong>
                  <span>
                    Sample event • simulated cloud relay
                  </span>
                </p>
              </div>

              <div>
                <i className="dot green" />

                <p>
                  <strong>Signal quality validated</strong>
                  <span>
                    Sample event • simulated local processing
                  </span>
                </p>
              </div>
            </div>
          </section>
        </div>

        <p
          style={{
            marginTop: "20px",
            fontSize: "12px",
            color: "#788497",
          }}
        >
          SmartVitals is a feasibility-study prototype using synthetic
          patient information and simulated telemetry. It is not a
          clinically validated medical device.
        </p>

      </section>
    </Shell>
  );
}
