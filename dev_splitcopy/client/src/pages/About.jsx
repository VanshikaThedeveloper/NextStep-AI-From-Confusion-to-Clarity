import {
  RiAwardLine,
  RiBarChartLine,
  RiGroupLine,
  RiLightbulbLine,
  RiRocketLine,
  RiShieldCheckLine,
} from 'react-icons/ri';

import DashboardFooter from '../components/DashboardFooter';

const benefits = [
  {
    icon: <RiRocketLine />,
    title: 'Launch Faster',
    desc: 'Go from application draft to confident submission with tighter AI-assisted iteration.',
  },
  {
    icon: <RiShieldCheckLine />,
    title: 'ATS Awareness',
    desc: 'Frame experience in a way that survives applicant tracking filters and still sounds human.',
  },
  {
    icon: <RiLightbulbLine />,
    title: 'Smart Coaching',
    desc: 'Use AI to surface weak stories, unclear phrasing, and the parts of your narrative that need work.',
  },
  {
    icon: <RiBarChartLine />,
    title: 'Progress Visibility',
    desc: 'Track practice across resume edits, interview runs, voice sessions, and notes.',
  },
  {
    icon: <RiAwardLine />,
    title: 'Skill Positioning',
    desc: 'Understand what to highlight now and what to learn next for the roles you want.',
  },
  {
    icon: <RiGroupLine />,
    title: 'Built For Students',
    desc: 'The product is shaped around real early-career uncertainty instead of generic recruitment jargon.',
  },
];

const features = [
  {
    name: 'Resume Analyzer',
    desc: 'AI review with structure cues, role-fit suggestions, and wording improvements.',
  },
  {
    name: 'Interview Chatbot',
    desc: 'Adaptive mock interviews that expose shaky answers before a recruiter does.',
  },
  {
    name: 'Career Roadmap',
    desc: 'Get a personalized learning plan for the software domain you want to break into.',
  },
  {
    name: 'Resume Builder',
    desc: 'Craft a resume with AI guidance, templates, and real-time feedback.',
  },
];

const About = () => {
  return (
    <div className="info-page">
      <section className="info-hero" aria-labelledby="about-heading">
        <span className="section-kicker">About Dev_Split</span>
        <h1 className="section-title" id="about-heading">
          We are building an AI career studio that feels more intentional than the
          tools students are usually handed.
        </h1>
        <p className="section-copy">
          Dev_Split exists for developers and early-career professionals who know
          they have potential but need a better environment for resume work,
          interview practice, and career storytelling.
        </p>
      </section>

      <section className="dashboard-section info-story-grid">
        <article className="story-card">
          <span className="section-kicker">Mission</span>
          <h2>Democratize high-quality career coaching.</h2>
          <p>
            We believe world-class prep should not be reserved for the few people
            who can afford expensive bootcamps or private coaching. Dev_Split
            compresses that guidance into AI-assisted workflows anyone can access.
          </p>
        </article>

        <article className="story-card is-accent">
          <span className="section-kicker">Design direction</span>
          <h2>Premium, dark, tactile, and topic-specific.</h2>
          <p>
            The new interface leans into glass surfaces, soft depth, and a green
            cinematic accent so the product feels like a serious career studio,
            not a generic SaaS shell.
          </p>
        </article>
      </section>

      <section className="dashboard-section" aria-labelledby="benefits-heading">
        <div className="section-heading is-left">
          <span className="section-kicker">Benefits</span>
          <h2 className="section-title" id="benefits-heading">
            What students and early builders gain here
          </h2>
        </div>
        <div className="benefit-grid">
          {benefits.map(({ icon, title, desc }) => (
            <article key={title} className="benefit-card">
              <div className="benefit-icon" aria-hidden="true">
                {icon}
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-section" aria-labelledby="features-heading">
        <div className="section-heading is-left">
          <span className="section-kicker">Platform features</span>
          <h2 className="section-title" id="features-heading">
            The modules that make the studio useful
          </h2>
        </div>
        <div className="feature-strip">
          {features.map(({ name, desc }) => (
            <article key={name} className="feature-strip-card">
              <h3>{name}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <DashboardFooter />
    </div>
  );
};

export default About;
