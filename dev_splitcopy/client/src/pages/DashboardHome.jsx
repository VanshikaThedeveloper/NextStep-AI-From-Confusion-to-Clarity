import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  RiArrowRightUpLine,
  RiFileTextLine,
  RiLightbulbLine,
  RiMicLine,
  RiRobot2Line,
  RiStickyNoteLine,
} from 'react-icons/ri';

import DashboardFooter from '../components/DashboardFooter';
import StatCard from '../components/StatCard';

const useTypingEffect = (words, speed = 90, delay = 1500) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timeout;

    if (!isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.substring(0, displayText.length + 1));

        if (displayText === currentWord) {
          setTimeout(() => setIsDeleting(true), delay);
        }
      }, speed);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.substring(0, displayText.length - 1));

        if (displayText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((current) => (current + 1) % words.length);
        }
      }, speed / 2);
    }

    return () => clearTimeout(timeout);
  }, [currentWordIndex, delay, displayText, isDeleting, speed, words]);

  return displayText;
};

const stats = [
  {
    icon: <RiFileTextLine />,
    title: "Resumes Analyzed",
    count: 0,
    color: "#7affca",
    accentBg: "rgba(122, 255, 202, 0.12)",
    caption: "First upload starts your analytics trail",
  },
  {
    icon: <RiRobot2Line />,
    title: "Interview Sessions",
    count: 0,
    color: "#56d7ff",
    accentBg: "rgba(86, 215, 255, 0.12)",
    caption: "Practice loops will appear here",
  },
  // {
  //   icon: <RiMicLine />,
  //   title: "Voice Conversations",
  //   count: 0,
  //   color: "#8c98ff",
  //   accentBg: "rgba(140, 152, 255, 0.12)",
  //   caption: "Unlock with your first voice rehearsal",
  // },
  // {
  //   icon: <RiStickyNoteLine />,
  //   title: "Notes Created",
  //   count: 0,
  //   color: "#f5cb72",
  //   accentBg: "rgba(245, 203, 114, 0.12)",
  //   caption: "Capture insights as you go",
  // },
  
];

const quickActions = [
  {
    emoji: "Resume",
    title: "Analyze Resume",
    desc: "Upload and get structured AI feedback on your current document.",
    href: "/dashboard/resume",
  },
  {
    emoji: "Interview",
    title: "Practice Interview",
    desc: "Run a mock session and tune your answers before the real thing.",
    href: "/dashboard/chat",
  },
  // {
  //   emoji: "Notes",
  //   title: "Smart Notes",
  //   desc: "Write down stories, feedback, and prep points you do not want to lose.",
  //   href: "/dashboard/roadmap",
  // },
  // {
  //   emoji: "Voice",
  //   title: "Voice Session",
  //   desc: "Practice spoken confidence, pacing, and clarity with live AI support.",
  //   href: "/dashboard/talk",
  // },
  {
    emoji: "Resume Builder",
    title: "Resume Builder",
    desc: "Craft a resume with AI guidance, templates, and real-time feedback.",
    href: "/dashboard/buildresume",
  },
  {
    emoji: "Roadmap",
    title: "Domain Roadmap",
    desc: "Get a personalized learning plan for the software domain you want to break into.",
    href: "/dashboard/roadmap",
  },
];

const launchSequence = [
  'Start with Resume Radar to sharpen keywords and project outcomes.',
  'Move into Interview Lab once the story is crisp enough to speak out loud.',
  'Store breakthroughs in Notes Vault so your next answer gets stronger.',
];

const discoveryCards = [
  {
    title: 'Our story',
    desc: 'See why Dev_Split exists and how we think about developer careers.',
    to: '/dashboard/about',
  },
  {
    title: 'Meet the team',
    desc: 'Explore the people shaping the product behind the studio.',
    to: '/dashboard/team',
  },
  {
    title: 'Need help?',
    desc: 'Contact the team if you want support, feedback, or collaboration.',
    to: '/dashboard/contact',
  },
];

const DashboardHome = () => {
  const userName = localStorage.getItem('userName') || '';
  const words = [
    userName ? `Welcome back, ${userName}.` : 'Welcome to Dev_Split.',
    'Let us sharpen your next application.',
    'Practice until the story feels natural.',
  ];

  const typedText = useTypingEffect(words, 80, 1400);

  return (
    <div className="dashboard-view">
      <section className="control-hero" aria-labelledby="home-welcome-heading">
        <div className="control-hero-copy">
          <span className="section-kicker">Career command center</span>
          <h1 className="control-hero-title" id="home-welcome-heading">
            {typedText}
            <span className="control-hero-cursor">|</span>
          </h1>
          <p className="control-hero-text">
            This is your launch deck for resume refinement, mock interviews,
            notes, and voice practice. The visuals are new, but the workflows are
            still anchored to the same product features.
          </p>

          <div className="control-hero-actions">
            <a href="/resume" className="button-primary">
              Open Resume Radar
            </a>
            <Link to="/dashboard/about" className="button-secondary">
              Explore the studio
            </Link>
          </div>
        </div>

        <div className="control-hero-aside">
          <div className="hero-status-card">
            <div className="status-chip">
              <span className="status-chip-dot" aria-hidden="true" />
              Focus mode
            </div>
            <h2>What to do next</h2>
            <ul className="check-list compact">
              {launchSequence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="dashboard-section" aria-labelledby="stats-heading">
        <div className="section-heading is-left">
          <span className="section-kicker">Signals</span>
          <h2 className="section-title" id="stats-heading">
            Your activity map
          </h2>
        </div>
        <div className="signal-card-grid">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </section>

      <section className="dashboard-section" aria-labelledby="quick-heading">
        <div className="section-heading is-left">
          <span className="section-kicker">Modules</span>
          <h2 className="section-title" id="quick-heading">
            Jump into the tool you need right now
          </h2>
        </div>

        <div className="action-grid">
          {quickActions.map(({ emoji, title, desc, href }) => (
            <a key={title} href={href} className="action-card">
              <div className="action-card-top">
                <span className="action-chip">{emoji}</span>
                <RiArrowRightUpLine aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="dashboard-section dashboard-split">
        <div className="focus-card">
          <span className="section-kicker">Momentum stack</span>
          <h2 className="section-title">A better workflow than scattered tabs.</h2>
          <p className="section-copy">
            Resume review, interview practice, notes, and voice coaching now feel
            like parts of one system. That visual consistency should make the
            product feel more trustworthy and more serious.
          </p>
        </div>

        <div className="insight-card">
          <div className="insight-card-head">
            <RiLightbulbLine aria-hidden="true" />
            <span>Pro tip</span>
          </div>
          <p>
            Complete your profile and save notes after each mock interview. The
            gains are small in isolation, but they compound fast.
          </p>
        </div>
      </section>

      <section className="dashboard-section" aria-labelledby="discover-heading">
        <div className="section-heading is-left">
          <span className="section-kicker">Explore</span>
          <h2 className="section-title" id="discover-heading">
            More ways to navigate the platform
          </h2>
        </div>

        <div className="discovery-grid">
          {discoveryCards.map(({ title, desc, to }) => (
            <Link key={title} to={to} className="discovery-card">
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="discovery-link">
                Open <RiArrowRightUpLine aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <DashboardFooter />
    </div>
  );
};

export default DashboardHome;
