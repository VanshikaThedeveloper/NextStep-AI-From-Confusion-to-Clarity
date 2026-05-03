import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RiArrowDownSLine, RiLogoutBoxLine } from 'react-icons/ri';

const navLinks = [
  { to: '/dashboard', label: 'Overview' },
  { to: '/dashboard/about', label: 'Story' },
  { to: '/dashboard/contact', label: 'Contact' },
  { to: '/dashboard/team', label: 'Team' },
];

const Navbar2 = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userName = localStorage.getItem('userName') || 'User';
  const avatarInitial = userName.charAt(0).toUpperCase();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    toast.success('Logged out. See you soon!');
    navigate('/');
  };

  return (
    <header className="control-nav" role="banner" id="dash-navbar">
      <div className="control-nav-shell">
        <Link to="/dashboard" className="brand-mark" aria-label="Dev_Split dashboard">
          <span className="brand-mark-cube" aria-hidden="true" />
          <span className="brand-mark-copy">
            Dev<span>_Split</span>
          </span>
        </Link>

        <nav className="control-nav-links" aria-label="Dashboard navigation">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/dashboard'}
              className={({ isActive }) =>
                `control-nav-link ${isActive ? 'is-active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="control-nav-right">
          <div className="status-chip" aria-label="System status">
            <span className="status-chip-dot" aria-hidden="true" />
            Career signal live
          </div>

          <div className="control-profile" ref={dropdownRef}>
            <button
              className="control-profile-button"
              onClick={() => setDropdownOpen((current) => !current)}
              aria-label="Open profile menu"
              aria-expanded={dropdownOpen}
              id="dash-profile-btn"
            >
              <div className="control-profile-avatar" aria-hidden="true">
                {avatarInitial}
              </div>
              <div className="control-profile-copy">
                <span className="control-profile-name">{userName}</span>
                <span className="control-profile-role">Career Explorer</span>
              </div>
              <RiArrowDownSLine
                className={`control-profile-arrow ${
                  dropdownOpen ? 'is-open' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {dropdownOpen && (
              <div className="control-profile-menu" role="menu" aria-label="Profile menu">
                <div className="control-profile-menu-head">
                  <div className="control-profile-avatar is-large" aria-hidden="true">
                    {avatarInitial}
                  </div>
                  <div>
                    <p className="control-profile-menu-name">{userName}</p>
                    <p className="control-profile-menu-text">
                      Dev_Split keeps your resume, interviews, and notes in one
                      workspace.
                    </p>
                  </div>
                </div>

                <button
                  className="control-profile-menu-action"
                  onClick={handleLogout}
                  role="menuitem"
                  id="dash-logout-btn"
                >
                  <RiLogoutBoxLine aria-hidden="true" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar2;
