import Link from "next/link";
import Shell from "../../components/Shell";
import { alerts, patients } from "../../lib/data";

function statusClass(status: string) {
  return status.toLowerCase();
}

export default function Dashboard() {
  const stable = patients.filter(p => p.status === "Stable").length;
  const warning = patients.filter(p => p.status === "Warning").length;
  const critical = patients.filter(p => p.status === "Critical").length;

  return (
    <Shell>
      <section className="content">
        <div className="pageHead">
          <div>
            <p className="eyebrow">CLINICAL OVERVIEW</p>
            <h1>Good evening, Dr. Riley</h1>
            <p>Here is the current status of your assigned patients.</p>
          </div>
          <button className="secondaryBtn">Export summary</button>
        </div>

        <div className="statsGrid">
          <div className="card stat"><span>Total patients</span><strong>{patients.length}</strong><small>Assigned today</small></div>
          <div className="card stat"><span>Stable</span><strong>{stable}</strong><small>Within expected range</small></div>
          <div className="card stat"><span>Warning</span><strong>{warning}</strong><small>Needs review</small></div>
          <div className="card stat criticalBorder"><span>Critical</span><strong>{critical}</strong><small>Immediate attention</small></div>
        </div>

        <div className="split">
          <section className="card">
            <div className="cardHead">
              <div>
                <h3>Priority alerts</h3>
                <p>Most recent abnormal observations</p>
              </div>
              <Link href="/alerts" className="textLink">View all</Link>
            </div>

            <div className="alertList">
              {alerts.map((a) => (
                <div className="alertRow" key={a.patient + a.type}>
                  <div className={`alertIcon ${a.level.toLowerCase()}`}>!</div>
                  <div className="grow">
                    <strong>{a.patient}</strong>
                    <span>{a.type} • {a.value}</span>
                  </div>
                  <small>{a.time}</small>
                  <button className="reviewBtn">Review</button>
                </div>
              ))}
            </div>
          </section>

          <section className="card systemCard">
            <div className="cardHead">
              <div>
                <h3>System health</h3>
                <p>Prototype service status</p>
              </div>
              <span className="statusPill stable">Operational</span>
            </div>
            <div className="systemRows">
              <div><span>Cloud relay</span><b><i className="dot green"/> Online</b></div>
              <div><span>Authentication</span><b><i className="dot green"/> Verified</b></div>
              <div><span>Audit logging</span><b><i className="dot green"/> Enabled</b></div>
              <div><span>Alert processing</span><b><i className="dot green"/> Active</b></div>
            </div>
          </section>
        </div>

        <section className="card" id="patients">
          <div className="cardHead">
            <div>
              <h3>Patient monitoring</h3>
              <p>Live simulated vital-sign overview</p>
            </div>
            <input className="search" placeholder="Search patient..." />
          </div>

          <div className="tableWrap">
            <table>
              <thead><tr><th>Patient</th><th>Heart rate</th><th>SpO₂</th><th>Temp</th><th>Signal</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {patients.map(p => (
                  <tr key={p.id}>
                    <td><div className="patientCell"><div className="avatar small">{p.name.split(" ").map(n=>n[0]).join("")}</div><div><strong>{p.name}</strong><span>{p.id} • {p.age} yrs</span></div></div></td>
                    <td>{p.hr} <small>BPM</small></td>
                    <td>{p.spo2}%</td>
                    <td>{p.temp}°C</td>
                    <td>{p.signal}%</td>
                    <td><span className={`statusPill ${statusClass(p.status)}`}>{p.status}</span></td>
                    <td><Link className="openBtn" href={`/patients/${p.id}`}>Open →</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </Shell>
  );
}
