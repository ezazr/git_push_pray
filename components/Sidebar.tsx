import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brandMark">S</div>
        <div>
          <strong>SmartVitals</strong>
          <span>Virtual Care</span>
        </div>
      </div>

      <nav>
        <Link href="/dashboard">⌂ <span>Dashboard</span></Link>
        <Link href="/dashboard#patients">◎ <span>Patients</span></Link>
        <Link href="/alerts">⚠ <span>Alerts</span></Link>
        <Link href="/patient-view">♡ <span>Patient View</span></Link>
      </nav>

      <div className="sidebarFoot">
        <div className="miniStatus"><span className="dot green" /> Platform operational</div>
        <small>Prototype • Simulated data</small>
      </div>
    </aside>
  );
}
