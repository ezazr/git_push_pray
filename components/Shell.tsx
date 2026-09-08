import Sidebar from "./Sidebar";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <Sidebar />
      <main className="main">
        <header className="topbar">
          <div>
            <span className="eyebrow">VVED REMOTE MONITORING</span>
          </div>
          <div className="topActions">
            <div className="securePill">◉ TLS secure</div>
            <div className="avatar">DR</div>
            <div className="doctor">
              <strong>Dr. Riley</strong>
              <span>Clinician</span>
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
