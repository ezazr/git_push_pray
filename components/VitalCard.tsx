export default function VitalCard({
  label, value, unit, hint, tone = "neutral"
}: {
  label: string; value: string | number; unit?: string; hint?: string; tone?: "neutral" | "warning" | "critical" | "good";
}) {
  return (
    <div className={`card vital ${tone}`}>
      <div className="cardLabel">{label}</div>
      <div className="vitalValue">{value}<span>{unit}</span></div>
      {hint && <div className="hint">{hint}</div>}
    </div>
  );
}
