import {
  RiArrowUpLine,
  RiGithubFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiMailLine,
} from 'react-icons/ri';

const DashboardFooter = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="control-footer" role="contentinfo" id="dash-footer">
      <div className="control-footer-shell">
        <div>
          <div className="brand-mark">
            <span className="brand-mark-cube" aria-hidden="true" />
            <span className="brand-mark-copy">
              Dev<span>_Split</span>
            </span>
          </div>
          <p className="control-footer-copy">
            AI-powered career tooling for students, builders, and early-stage
            professionals who want more signal and less guessing.
          </p>
        </div>

        <div className="control-footer-socials" aria-label="Social media links">
          <a
            href="https://www.linkedin.com/in/vanshika-a05b26293"
            target="_blank"
            rel="noopener noreferrer"
            className="control-footer-social"
            aria-label="LinkedIn"
            id="footer-linkedin"
          >
            <RiLinkedinFill />
          </a>
          <a
            href="https://github.com/VanshikaThedeveloper"
            target="_blank"
            rel="noopener noreferrer"
            className="control-footer-social"
            aria-label="GitHub"
            id="footer-github"
          >
            <RiGithubFill />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="control-footer-social"
            aria-label="Instagram"
            id="footer-instagram"
          >
            <RiInstagramLine />
          </a>
          <a
            href="mailto:hello@devsplit.ai"
            className="control-footer-social"
            aria-label="Email us"
            id="footer-email"
          >
            <RiMailLine />
          </a>
        </div>

        <button
          className="control-footer-top"
          onClick={scrollToTop}
          aria-label="Back to top"
          id="back-to-top"
        >
          <RiArrowUpLine aria-hidden="true" />
          <span>Back to top</span>
        </button>
      </div>

      <div className="control-footer-bottom">
        <p>© {new Date().getFullYear()} Dev_Split. All rights reserved.</p>
        <a href="mailto:hello@devsplit.ai" className="control-footer-email">
          hello@devsplit.ai
        </a>
      </div>
    </footer>
  );
};

export default DashboardFooter;
