import Shell from "../../components/Shell";
import { alerts } from "../../lib/data";

export default function AlertsPage() {
  return (
    <Shell>
      <section className="content">
        <div className="pageHead">
          <div><p className="eyebrow">ALERT TRIAGE</p><h1>Clinical alerts</h1><p>Review and prioritise abnormal readings.</p></div>
        </div>

        <section className="card">
          <div className="alertList large">
            {alerts.map(a => (
              <div className="alertRow" key={a.patient+a.type}>
                <div className={`alertIcon ${a.level.toLowerCase()}`}>!</div>
                <div className="grow"><strong>{a.patient}</strong><span>{a.type} • {a.value}</span></div>
                <span className={`statusPill ${a.level.toLowerCase()}`}>{a.level}</span>
                <small>{a.time}</small>
                <button className="reviewBtn">Acknowledge</button>
              </div>
            ))}
          </div>
        </section>
      </section>
    </Shell>
  );
}
