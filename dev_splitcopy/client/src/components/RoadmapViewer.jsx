import {
  RiRoadMapLine,
  RiToolsLine,
  RiLightbulbLine,
  RiFlashlightLine,
  RiArrowRightSLine,
  RiCloseLine,
  RiBookOpenLine,
  RiFileTextLine,
} from "react-icons/ri";

/* colour accents for each step — cycles through */
const STEP_ACCENTS = [
  { bg: "rgba(122,255,202,0.10)", border: "rgba(122,255,202,0.25)", text: "#7affca", glow: "rgba(122,255,202,0.06)" },
  { bg: "rgba(86,215,255,0.10)",  border: "rgba(86,215,255,0.25)",  text: "#56d7ff", glow: "rgba(86,215,255,0.06)" },
  { bg: "rgba(140,152,255,0.10)", border: "rgba(140,152,255,0.25)", text: "#8c98ff", glow: "rgba(140,152,255,0.06)" },
  { bg: "rgba(245,203,114,0.10)", border: "rgba(245,203,114,0.25)", text: "#f5cb72", glow: "rgba(245,203,114,0.06)" },
  { bg: "rgba(255,133,133,0.10)", border: "rgba(255,133,133,0.25)", text: "#ff8585", glow: "rgba(255,133,133,0.06)" },
  { bg: "rgba(32,224,141,0.10)",  border: "rgba(32,224,141,0.25)",  text: "#20e08d", glow: "rgba(32,224,141,0.06)" },
];

export default function RoadmapViewer({ data, close, inline }) {
  const content = data.content;

  const isStructured =
    content && typeof content === "object" && !content.raw_content;

  const hasRawFallback =
    content && typeof content === "object" && content.raw_content;

  const wrapperClass = inline ? "rv-inline" : "roadmap-viewer-overlay";

  const inner = (
    <div className={`rv-container ${inline ? "rv-container--inline" : ""}`} onClick={(e) => e.stopPropagation()}>
      {/* Close button */}
      <button className="rv-close-btn" onClick={close} aria-label="Close roadmap">
        <RiCloseLine />
      </button>

      {/* Title */}
      <div className="rv-header">
        <div className="rv-header-icon">
          <RiRoadMapLine />
        </div>
        <h2 className="rv-title">
          {content?.title || data.title || data.domain || "Roadmap"}
        </h2>
        <p className="rv-subtitle">
          AI-generated learning path with {content?.steps?.length || 0} steps,{" "}
          {content?.projects?.length || 0} projects, and{" "}
          {content?.tools?.length || 0} tools
        </p>
      </div>

      {isStructured ? (
        <div className="rv-body">
          {/* ── Introduction ── */}
          {content.introduction && (
            <section className="rv-section">
              <div className="rv-intro-card">
                <div className="rv-intro-icon-wrap">
                  <RiFileTextLine />
                </div>
                <p className="rv-intro-text">{content.introduction}</p>
              </div>
            </section>
          )}

          {/* ── Learning Path (Steps) ── */}
          {content.steps?.length > 0 && (
            <section className="rv-section">
              <h3 className="rv-section-heading">
                <span className="rv-section-heading-icon" style={{ background: "rgba(122,255,202,0.1)", color: "#7affca" }}>
                  <RiRoadMapLine />
                </span>
                Learning Path
              </h3>

              <div className="rv-timeline">
                {content.steps.map((s, i) => {
                  const accent = STEP_ACCENTS[i % STEP_ACCENTS.length];
                  return (
                    <div
                      key={i}
                      className="rv-step"
                      style={{
                        "--step-bg": accent.bg,
                        "--step-border": accent.border,
                        "--step-text": accent.text,
                        "--step-glow": accent.glow,
                        animationDelay: `${i * 80}ms`,
                      }}
                    >
                      {/* Timeline connector */}
                      <div className="rv-step-connector">
                        <span className="rv-step-number">{i + 1}</span>
                        {i < content.steps.length - 1 && <div className="rv-step-line" />}
                      </div>

                      {/* Card */}
                      <div className="rv-step-card">
                        <div className="rv-step-card-header">
                          <span className="rv-step-badge">{s.step || `Step ${i + 1}`}</span>
                        </div>

                        {s.description && (
                          <p className="rv-step-desc">{s.description}</p>
                        )}

                        {s.topics?.length > 0 && (
                          <ul className="rv-step-topics-list">
                            {s.topics.map((topic, j) => (
                              <li key={j} className="rv-topic-item">
                                <span className="rv-topic-bullet">•</span>
                                <span className="rv-topic-text">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── Projects ── */}
          {content.projects?.length > 0 && (
            <section className="rv-section">
              <h3 className="rv-section-heading">
                <span className="rv-section-heading-icon" style={{ background: "rgba(245,203,114,0.1)", color: "#f5cb72" }}>
                  <RiFlashlightLine />
                </span>
                Project Ideas
              </h3>
              <div className="rv-project-grid">
                {content.projects.map((proj, i) => (
                  <div key={i} className="rv-project-card">
                    <span className="rv-project-num">{String(i + 1).padStart(2, "0")}</span>
                    <p>{proj}</p>
                    <RiArrowRightSLine className="rv-project-arrow" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Tools ── */}
          {content.tools?.length > 0 && (
            <section className="rv-section">
              <h3 className="rv-section-heading">
                <span className="rv-section-heading-icon" style={{ background: "rgba(86,215,255,0.1)", color: "#56d7ff" }}>
                  <RiToolsLine />
                </span>
                Tools and Technologies
              </h3>
              <div className="rv-tools-grid">
                {content.tools.map((tool, i) => (
                  <span key={i} className="rv-tool-chip">
                    {tool}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* ── Tips ── */}
          {content.tips?.length > 0 && (
            <section className="rv-section">
              <h3 className="rv-section-heading">
                <span className="rv-section-heading-icon" style={{ background: "rgba(140,152,255,0.1)", color: "#8c98ff" }}>
                  <RiLightbulbLine />
                </span>
                Pro Tips
              </h3>
              <div className="rv-tips-list">
                {content.tips.map((tip, i) => (
                  <div key={i} className="rv-tip-card">
                    <div className="rv-tip-icon-wrap">
                      <RiBookOpenLine />
                    </div>
                    <p>{tip}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        /* ── Fallback raw text ── */
        <div className="rv-raw-fallback">
          <pre>{hasRawFallback ? content.raw_content : String(content)}</pre>
        </div>
      )}
    </div>
  );

  if (inline) return <div className="rv-inline-wrapper">{inner}</div>;

  return (
    <div className={wrapperClass} onClick={close}>
      {inner}
    </div>
  );
}

