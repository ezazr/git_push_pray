import Link from "next/link";

export default function Home() {
  return (
    <main className="loginPage">
      <section className="loginPanel">
        <div className="loginBrand">
          <div className="brandMark big">S</div>
          <div>
            <h1>SmartVitals</h1>
            <p>Remote Patient Monitoring</p>
          </div>
        </div>

        <div className="loginCard">
          <span className="eyebrow">CLINICIAN ACCESS</span>
          <h2>Welcome back</h2>
          <p>Access the monitoring dashboard using the prototype clinician account.</p>

          <label>Email</label>
          <input defaultValue="clinician@smartvitals.demo" />
          <label>Password</label>
          <input type="password" defaultValue="prototype" />
          <Link className="primaryBtn" href="/dashboard">Sign in securely</Link>

          <div className="loginNote">
            <strong>Prototype notice</strong>
            <span>This demonstration uses simulated patient and sensor data only.</span>
          </div>
        </div>
      </section>

      <section className="heroPanel">
        <div className="heroInner">
          <div className="heroBadge">AI-enabled virtual care concept</div>
          <h2>See what matters.<br />Act when it matters.</h2>
          <p>A streamlined clinical workspace for continuous remote patient monitoring, alert triage and device visibility.</p>
          <div className="heroStats">
            <div><strong>500 Hz</strong><span>Target sensing</span></div>
            <div><strong>4</strong><span>Core modalities</span></div>
            <div><strong>24/7</strong><span>Monitoring concept</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}
