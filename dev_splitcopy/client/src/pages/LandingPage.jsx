import { Link } from 'react-router-dom';
import {
  RiArrowRightUpLine,
  RiBarChartLine,
  RiCheckLine,
  RiFileTextLine,
  RiLightbulbLine,
  RiMailLine,
  RiMicLine,
  RiRobot2Line,
  RiRocketLine,
  RiShieldCheckLine,
  RiStickyNoteLine,
  RiTeamLine,
} from 'react-icons/ri';

import heroImage from '../assets/hero.png';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const modules = [
  {
    icon: <RiFileTextLine />,
    title: "Resume Radar",
    tag: "ATS intelligence",
    desc: "Shape each resume around the role you want, with cleaner wording and sharper signal.",
  },
  {
    icon: <RiRobot2Line />,
    title: "Interview Simulator",
    tag: "Adaptive coaching",
    desc: "Practice technical and behavioral rounds with an AI interviewer that pushes where you hesitate.",
  },
  {
    icon: <RiMicLine />,
    title: "Resume Builder",
    tag: "Ai Resume",
    desc: "Craft a resume with ai guidance, templates and real time feedback to get past ATS and impress recruiters.",
  },
  {
    icon: <RiStickyNoteLine />,
    title: "Career Roadmap",
    tag: "Career Roadmap",
    desc: "Capture insights, interview takeaways, and prep notes in one searchable space.",
  },
];

const workflow = [
  {
    step: '01',
    title: 'Decode your current signal',
    desc: 'We audit your resume, your role target, and the gaps holding your story back.',
  },
  {
    step: '02',
    title: 'Rehearse until your answers land',
    desc: 'Interview and voice modules create pressure in a safe environment before real recruiters do.',
  },
  {
    step: '03',
    title: 'Store what you learn',
    desc: 'Notes and feedback stay connected, so every attempt compounds into a better next move.',
  },
  {
    step: '04',
    title: 'Ship stronger applications',
    desc: 'You leave the studio with cleaner documents, clearer positioning, and more confidence.',
  },
];

const roleTracks = [
  {
    title: 'Frontend Builder Track',
    subtitle: 'Portfolios, storytelling, product sense',
  },
  {
    title: 'Data + Analyst Track',
    subtitle: 'Resume clarity, case narratives, measurable outcomes',
  },
  {
    title: 'AI / ML Explorer Track',
    subtitle: 'Project framing, voice confidence, interview iteration',
  },
  {
    title: 'Career Switcher Track',
    subtitle: 'Transferable skills, confidence rebuild, sharper positioning',
  },
];

const signalMetrics = [
  { value: '01', label: 'Career studio' },
  { value: '04', label: 'Core modules' },
  { value: '24/7', label: 'Practice window' },
  { value: '∞', label: 'Iterative feedback' },
];

const LandingPage = () => {
  return (
    <div className="studio-page">
      <Navbar />

      <main>
        <section className="hero-stage" id="hero" aria-labelledby="hero-heading">
          <div className="site-shell hero-stage-shell">
            <div className="hero-copy">
              <div className="eyebrow-pill">AI career studio for ambitious builders</div>
              <h1 className="hero-title" id="hero-heading">
                Engineer a career signal recruiters can feel before the interview
                starts.
              </h1>
              <p className="hero-lede">
                Dev_Split brings resume refinement, mock interviews, voice
                coaching, notes, and job-readiness strategy into one immersive
                command center built for developers and early-career talent.
              </p>

              <div className="hero-actions">
                <Link to="/register" className="button-primary" id="hero-get-started-btn">
                  Start Building
                </Link>
                <Link to="/login" className="button-secondary" id="hero-register-btn">
                  Open My Studio
                </Link>
              </div>

              <div className="hero-metrics">
                {signalMetrics.map(({ value, label }) => (
                  <article key={label} className="metric-chip">
                    <span className="metric-chip-value">{value}</span>
                    <span className="metric-chip-label">{label}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <div className="command-board">
                <div className="command-board-head">
                  <div>
                    <p className="command-board-kicker">Mission Control</p>
                    <h2 className="command-board-title">Career signal cockpit</h2>
                  </div>
                  <div className="status-chip">
                    <span className="status-chip-dot" aria-hidden="true" />
                    Analysis active
                  </div>
                </div>

                <div className="command-board-stage">
                  <div className="command-board-orb command-board-orb-1" aria-hidden="true" />
                  <div className="command-board-orb command-board-orb-2" aria-hidden="true" />
                  <img
                    src={heroImage}
                    alt="Layered glass illustration representing the Dev_Split studio"
                    className="command-board-art"
                  />
                  <article className="floating-note floating-note-top">
                    <span className="floating-note-label">Resume Radar</span>
                    <strong>Sharper keywords, cleaner outcomes</strong>
                  </article>
                  <article className="floating-note floating-note-bottom">
                    <span className="floating-note-label">Voice Coach</span>
                    <strong>Practice answers with real cadence</strong>
                  </article>
                </div>

                <div className="command-board-grid">
                  {modules.slice(0, 4).map(({ title, tag, icon }) => (
                    <div key={title} className="command-board-mini-card">
                      <div className="command-board-mini-icon" aria-hidden="true">
                        {icon}
                      </div>
                      <div>
                        <p>{title}</p>
                        <span>{tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section" id="modules" aria-labelledby="modules-title">
          <div className="site-shell">
            <div className="section-heading">
              <span className="section-kicker">Core modules</span>
              <h2 className="section-title" id="modules-title">
                Not a generic career site. A focused studio for getting hired
                with more intention.
              </h2>
              <p className="section-copy">
                Each surface is designed around the actual work of getting
                job-ready: clarifying your story, rehearsing under pressure, and
                storing everything you learn.
              </p>
            </div>

            <div className="module-grid">
              {modules.map(({ icon, title, tag, desc }, index) => (
                <article
                  key={title}
                  className={`module-card ${index === 4 ? 'is-highlighted' : ''}`}
                >
                  <div className="module-card-head">
                    <div className="module-icon" aria-hidden="true">
                      {icon}
                    </div>
                    <span className="module-tag">{tag}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <div className="module-link">
                    <span>Built for momentum</span>
                    <RiArrowRightUpLine aria-hidden="true" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="page-section workflow-section"
          id="workflow"
          aria-labelledby="workflow-title"
        >
          <div className="site-shell workflow-shell">
            <div className="section-heading is-left">
              <span className="section-kicker">Operating rhythm</span>
              <h2 className="section-title" id="workflow-title">
                Every practice loop leaves you stronger for the next application.
              </h2>
              <p className="section-copy">
                Dev_Split is meant to compound. Resume feedback informs your mock
                answers. Voice sessions expose weak spots. Notes turn into better
                stories. The whole experience is connected.
              </p>
            </div>

            <div className="workflow-layout">
              <div className="workflow-list">
                {workflow.map(({ step, title, desc }) => (
                  <article key={step} className="workflow-card">
                    <span className="workflow-step">{step}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{desc}</p>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="workflow-callout">
                <span className="section-kicker">Why it feels different</span>
                <h3>Glass depth outside, disciplined structure underneath.</h3>
                <ul className="check-list">
                  <li>
                    <RiCheckLine aria-hidden="true" />
                    Dark cinematic palette inspired by your reference, adapted to
                    an AI career product.
                  </li>
                  <li>
                    <RiCheckLine aria-hidden="true" />
                    Neumorphic control surfaces for modules, cards, and panels so
                    the interface feels tactile.
                  </li>
                  <li>
                    <RiCheckLine aria-hidden="true" />
                    Fluid motion kept subtle and purposeful instead of flashy for
                    its own sake.
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section className="page-section tracks-section" id="tracks" aria-labelledby="tracks-title">
          <div className="site-shell">
            <div className="section-heading">
              <span className="section-kicker">Targeted outcomes</span>
              <h2 className="section-title" id="tracks-title">
                Shape the studio around the role you want next.
              </h2>
              <p className="section-copy">
                Different goals need different pressure tests. The surfaces below
                keep the experience grounded in actual role paths instead of one
                big generic career funnel.
              </p>
            </div>

            <div className="track-grid">
              {roleTracks.map(({ title, subtitle }) => (
                <article key={title} className="track-card">
                  <div className="track-card-top">
                    <RiTeamLine aria-hidden="true" />
                    <span>Career path</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{subtitle}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-cta" aria-labelledby="landing-cta-title">
          <div className="site-shell landing-cta-shell">
            <div>
              <span className="section-kicker">Ready when you are</span>
              <h2 className="section-title" id="landing-cta-title">
                Stop preparing in fragments. Build your next opportunity from one
                studio.
              </h2>
            </div>

            <div className="landing-cta-actions">
              <Link to="/register" className="button-primary" id="cta-register-btn">
                Create Account
              </Link>
              <Link to="/login" className="button-secondary" id="cta-login-btn">
                Existing member login
              </Link>
            </div>

            <div className="landing-cta-trust">
              <article className="trust-pill">
                <RiShieldCheckLine aria-hidden="true" />
                <span>Built for focused practice</span>
              </article>
              <article className="trust-pill">
                <RiLightbulbLine aria-hidden="true" />
                <span>Designed for real career momentum</span>
              </article>
              <article className="trust-pill">
                <RiRocketLine aria-hidden="true" />
                <span>Made to feel premium, not templated</span>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
