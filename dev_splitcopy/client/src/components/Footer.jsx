import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-shell">
        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <div className="brand-mark">
              <span className="brand-mark-cube" aria-hidden="true" />
              <span className="brand-mark-copy">
                Dev<span>_Split</span>
              </span>
            </div>
            <p className="site-footer-copy">
              A cinematic AI career studio for developers who want sharper resumes,
              stronger interviews, and a clearer path to the right role.
            </p>
          </div>

          <div>
            <p className="site-footer-heading">Explore</p>
            <div className="site-footer-links">
              <Link to="/" className="site-footer-link" id="footer-home-link">
                Home
              </Link>
              <Link
                to="/register"
                className="site-footer-link"
                id="footer-register-link"
              >
                Create account
              </Link>
              <Link
                to="/login"
                className="site-footer-link"
                id="footer-login-link"
              >
                Login
              </Link>
              <Link
                to="/dashboard"
                className="site-footer-link"
                id="footer-dashboard-link"
              >
                Dashboard
              </Link>
            </div>
          </div>

          <div>
            <p className="site-footer-heading">Studio Modules</p>
            <div className="site-footer-links">
              <span className="site-footer-text">Resume Analyzer</span>
              <span className="site-footer-text">Interview simulator</span>
              <span className="site-footer-text">Career Roadmap</span>
              <span className="site-footer-text">Resume Builder</span>
            </div>
          </div>

          <div>
            <p className="site-footer-heading">Contact</p>
            <div className="site-footer-links">
              <a
                href="mailto:hello@devsplit.ai"
                className="site-footer-link"
                id="footer-email-link"
              >
                hello@devsplit.ai
              </a>
              <span className="site-footer-text">Remote-first, worldwide</span>
              <span className="site-footer-text">Mon-Sat, 9 AM to 7 PM IST</span>
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p>© {new Date().getFullYear()} Dev_Split. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="footer-top-button"
            id="back-to-top-btn"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
