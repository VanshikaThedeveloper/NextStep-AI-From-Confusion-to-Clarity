import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { href: '#modules', label: 'Modules' },
  { href: '#workflow', label: 'Workflow' },
  { href: '#tracks', label: 'Career Tracks' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="site-shell site-nav-shell">
        <Link to="/" className="brand-mark" aria-label="Dev_Split home">
          <span className="brand-mark-cube" aria-hidden="true" />
          <span className="brand-mark-copy">
            Dev<span>_Split</span>
          </span>
        </Link>

        <nav className="site-nav-links" aria-label="Landing sections">
          {navItems.map(({ href, label }) => (
            <a key={href} href={href} className="site-nav-link">
              {label}
            </a>
          ))}
        </nav>

        <div className="site-nav-actions">
          <Link to="/login" className="button-ghost" id="nav-login-btn">
            Log In
          </Link>
          <Link to="/register" className="button-primary" id="nav-register-btn">
            Enter The Studio
          </Link>
        </div>

        <button
          className={`nav-toggle ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          id="nav-hamburger-btn"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`site-mobile-drawer ${menuOpen ? 'is-open' : ''}`}>
        {navItems.map(({ href, label }) => (
          <a key={href} href={href} className="site-mobile-link">
            {label}
          </a>
        ))}
        <div className="site-mobile-actions">
          <Link to="/login" className="button-ghost" id="nav-mobile-login-btn">
            Log In
          </Link>
          <Link
            to="/register"
            className="button-primary"
            id="nav-mobile-register-btn"
          >
            Enter The Studio
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
