import { RiGithubFill, RiLinkedinFill, RiTwitterXLine } from 'react-icons/ri';

import DashboardFooter from '../components/DashboardFooter';

const avatarUrl = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=0f1718&color=7affca&size=200&bold=true&rounded=true`;

const teamMembers = [
  {
    name: 'Vanshika',
    role: 'Software Engineer',
    bio: 'Full-stack developer passionate about making tech careers accessible to everyone.',
    linkedin: 'https://www.linkedin.com/in/vanshika-a05b26293',
    github: 'https://github.com/VanshikaThedeveloper',
    twitter: '#',
  },
  {
    name: 'Bhoomi Singhal',
    role: 'Data Analyst',
    bio: 'Turning data into insights to help developers make smarter career decisions.',
    linkedin: '#',
    github: '#',
    twitter: '#',
  },
];

const Team = () => {
  return (
    <div className="info-page">
      <section className="info-hero" aria-labelledby="team-heading">
        <span className="section-kicker">Our team</span>
        <h1 className="section-title" id="team-heading">
          The people shaping the product behind the studio.
        </h1>
        <p className="section-copy">
          This redesign is not just about aesthetics. It is also about making the
          people and intent behind Dev_Split easier to trust.
        </p>
      </section>

      <section className="dashboard-section" aria-labelledby="team-grid-heading">
        <div className="section-heading is-left">
          <span className="section-kicker">Meet the crew</span>
          <h2 className="section-title" id="team-grid-heading">
            Builders with one shared goal: help developers present themselves
            better.
          </h2>
        </div>

        <div className="team-grid">
          {teamMembers.map(({ name, role, bio, linkedin, github, twitter }) => (
            <article key={name} className="team-card" aria-label={`${name}, ${role}`}>
              <div className="team-card-top">
                <img
                  src={avatarUrl(name)}
                  alt={`${name} avatar`}
                  className="team-avatar"
                  loading="lazy"
                  width="88"
                  height="88"
                />
              </div>
              <div className="team-card-body">
                <h3>{name}</h3>
                <p className="team-role">{role}</p>
                <p className="team-bio">{bio}</p>
                <div className="team-socials" aria-label={`${name} social links`}>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="team-social-link"
                    aria-label={`${name} LinkedIn`}
                  >
                    <RiLinkedinFill />
                  </a>
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="team-social-link"
                    aria-label={`${name} GitHub`}
                  >
                    <RiGithubFill />
                  </a>
                  <a
                    href={twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="team-social-link"
                    aria-label={`${name} Twitter`}
                  >
                    <RiTwitterXLine />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <article className="story-card is-accent">
          <span className="section-kicker">How we build</span>
          <h2>Interface polish matters when people are trying to believe in themselves.</h2>
          <p>
            Career products often look disposable. We wanted this one to feel more
            composed, more premium, and more aligned with the seriousness of the
            moment users are in.
          </p>
        </article>
      </section>

      <DashboardFooter />
    </div>
  );
};

export default Team;
