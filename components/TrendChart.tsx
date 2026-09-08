export default function TrendChart({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="card chartCard">
      <div className="cardHead">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <span className="chip">Last 6h</span>
      </div>
      <div className="chart">
        <svg viewBox="0 0 700 190" role="img" aria-label={`${title} simulated trend`}>
          <defs>
            <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.18"/>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.02"/>
            </linearGradient>
          </defs>
          <path className="gridLine" d="M0 40H700 M0 95H700 M0 150H700" />
          <path className="area" d="M0 140 C60 110, 90 120, 140 104 S230 70, 280 95 S365 120, 420 88 S510 56, 560 82 S645 92,700 62 L700 190 L0 190 Z" />
          <path className="line" d="M0 140 C60 110, 90 120, 140 104 S230 70, 280 95 S365 120, 420 88 S510 56, 560 82 S645 92,700 62" />
        </svg>
      </div>
    </div>
  );
}
