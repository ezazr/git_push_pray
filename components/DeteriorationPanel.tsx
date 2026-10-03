type DeteriorationPanelProps = {
  hr: number;
  spo2: number;
  signal: number;
};

export default function DeteriorationPanel({
  hr,
  spo2,
  signal,
}: DeteriorationPanelProps) {
  // Simulated patient baseline for prototype demonstration
  const baselineHR = { min: 68, max: 86 };
  const baselineSpO2 = { min: 95, max: 99 };

  const hrAbnormal = hr > baselineHR.max;
  const spo2Abnormal = spo2 < baselineSpO2.min;

  const abnormalCount =
    Number(hrAbnormal) +
    Number(spo2Abnormal);

  const highPriority = abnormalCount >= 2;

  // Difference from nearest normal baseline boundary
  const hrDifference = hrAbnormal
    ? hr - baselineHR.max
    : 0;

  const spo2Difference = spo2Abnormal
    ? baselineSpO2.min - spo2
    : 0;

  return (
    <section
      className={`deteriorationPanel ${
        highPriority ? "high" : "normal"
      }`}
    >
      {/* Top section */}
      <div className="deteriorationTop">
        <div>
          <span className="deteriorationLabel">
            SMARTVITALS CLINICAL INSIGHT
          </span>

          <h2>
            {highPriority
              ? "Possible deterioration detected"
              : "No significant deterioration detected"}
          </h2>

          <p>
            Current readings are compared with this patient's
            simulated baseline.
          </p>
        </div>

        <span
          className={`priorityBadge ${
            highPriority
              ? "priorityHigh"
              : "priorityNormal"
          }`}
        >
          {highPriority
            ? "HIGH PRIORITY"
            : "NORMAL PRIORITY"}
        </span>
      </div>

      {/* Baseline comparison */}
      <div className="baselineComparison">

        {/* SpO2 */}
        <div className="baselineItem">
          <span>SpO₂</span>

          <strong>{spo2}%</strong>

          <small>
            Baseline {baselineSpO2.min}–{baselineSpO2.max}%
          </small>

          {spo2Abnormal ? (
            <>
              <b className="readingDanger">
                ↓ Below baseline
              </b>

              <div className="deviationValue">
                {spo2Difference}% below minimum baseline
              </div>
            </>
          ) : (
            <b className="readingGood">
              ✓ Within baseline
            </b>
          )}
        </div>

        {/* Heart rate */}
        <div className="baselineItem">
          <span>Heart rate</span>

          <strong>{hr} BPM</strong>

          <small>
            Baseline {baselineHR.min}–{baselineHR.max} BPM
          </small>

          {hrAbnormal ? (
            <>
              <b className="readingDanger">
                ↑ Above baseline
              </b>

              <div className="deviationValue">
                +{hrDifference} BPM above maximum baseline
              </div>
            </>
          ) : (
            <b className="readingGood">
              ✓ Within baseline
            </b>
          )}
        </div>

        {/* Signal */}
        <div className="baselineItem">
          <span>Signal quality</span>

          <strong>{signal}%</strong>

          <small>Wearable telemetry</small>

          <b
            className={
              signal >= 80
                ? "readingGood"
                : "readingDanger"
            }
          >
            {signal >= 80
              ? "✓ Reliable signal"
              : "⚠ Low signal quality"}
          </b>
        </div>
      </div>

      {/* Explanation */}
      <div
        className={`priorityExplanation ${
          highPriority ? "priorityAlert" : ""
        }`}
      >
        <div className="priorityExplanationHeader">
          <div>
            <span className="explanationEyebrow">
              PRIORITY EXPLANATION
            </span>

            <h3>
              {highPriority
                ? "Why is this patient high priority?"
                : "Why is this patient normal priority?"}
            </h3>
          </div>

          <div className="abnormalCounter">
            <strong>{abnormalCount}</strong>
            <span>abnormal vitals</span>
          </div>
        </div>

        <div className="reasonList">

          {spo2Abnormal && (
            <div className="reasonItem reasonDanger">
              <span className="reasonIcon">!</span>

              <div>
                <strong>
                  Oxygen saturation below baseline
                </strong>

                <p>
                  Current SpO₂ is {spo2}% compared with
                  the simulated baseline of{" "}
                  {baselineSpO2.min}–{baselineSpO2.max}%.
                </p>
              </div>
            </div>
          )}

          {hrAbnormal && (
            <div className="reasonItem reasonDanger">
              <span className="reasonIcon">!</span>

              <div>
                <strong>
                  Heart rate above baseline
                </strong>

                <p>
                  Current heart rate is {hr} BPM compared
                  with the simulated baseline of{" "}
                  {baselineHR.min}–{baselineHR.max} BPM.
                </p>
              </div>
            </div>
          )}

          {!spo2Abnormal && !hrAbnormal && (
            <div className="reasonItem reasonNormal">
              <span className="reasonIcon">✓</span>

              <div>
                <strong>
                  Readings are within simulated baseline
                </strong>

                <p>
                  No monitored vital sign currently meets
                  this prototype's deterioration rule.
                </p>
              </div>
            </div>
          )}

        </div>

        <div className="workflowRecommendation">
          <div>
            <span>Prototype workflow</span>

            <strong>
              {highPriority
                ? "Clinical review suggested"
                : "Continue simulated monitoring"}
            </strong>
          </div>

          <span
            className={`workflowStatus ${
              highPriority
                ? "workflowReview"
                : "workflowMonitor"
            }`}
          >
            {highPriority ? "REVIEW" : "MONITOR"}
          </span>
        </div>
      </div>

      <div className="prototypeWarning">
        SIMULATED PROTOTYPE — Baselines and priority
        rules are demonstration values only. They are not
        clinically validated and are not intended for
        medical decision-making.
      </div>
    </section>
  );
}