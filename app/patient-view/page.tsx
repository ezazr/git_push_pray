import Shell from "../../components/Shell";

export default function PatientView() {
  return (
    <Shell>
      <section className="content narrow">
        <div className="pageHead">
          <div><p className="eyebrow">PATIENT MOBILE VIEW</p><h1>Your SmartVitals patch</h1><p>A simplified read-only view for the patient.</p></div>
        </div>

        <div className="patientMobile">
          <div className="mobileTop"><strong>SmartVitals</strong><span className="statusPill stable">Monitoring</span></div>
          <div className="mobileHero">
            <span>Current status</span>
            <h2>You're being monitored</h2>
            <p>Your latest readings are being sent securely to your care team.</p>
          </div>
          <div className="mobileVitals">
            <div><span>Heart rate</span><strong>76 <small>BPM</small></strong></div>
            <div><span>SpO₂</span><strong>98 <small>%</small></strong></div>
            <div><span>Temperature</span><strong>36.7 <small>°C</small></strong></div>
          </div>
          <div className="mobileStatus">
            <div><span className="dot green"/> Patch connected</div>
            <div><span className="dot green"/> Signal good</div>
            <div><span className="dot green"/> Battery 84%</div>
          </div>
          <div className="patientNote">If you feel seriously unwell, follow your clinical care instructions. This prototype does not provide medical advice.</div>
        </div>
      </section>
    </Shell>
  );
}
