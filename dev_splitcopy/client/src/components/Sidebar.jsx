import { NavLink } from 'react-router-dom';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiFileTextLine,
  RiMicLine,
  RiRobot2Line,
  RiStickyNoteLine,
} from 'react-icons/ri';

const sidebarItems = [
  {
    to: "/dashboard/resume",
    icon: <RiFileTextLine />,
    label: "Resume Analyzer",
    meta: "ATS + role fit",
    id: "sidebar-home",
  },
  {
    to: "/dashboard/chat",
    icon: <RiRobot2Line />,
    label: "Chat Bot",
    meta: "Adaptive prompts",
    id: "sidebar-about",
  },
  // {
  //   to: "/dashboard/notes",
  //   icon: <RiStickyNoteLine />,
  //   label: "Manage Notes",
  //   meta: "Capture insight",
  //   id: "sidebar-contact",
  // },
  // {
  //   to: "/dashboard/talk",
  //   icon: <RiMicLine />,
  //   label: "Voice Assistant",
  //   meta: "Real-time practice",
  //   id: "sidebar-team",
  // },
  {
    to: "/dashboard/roadmap",
    icon: <RiFileTextLine />,
    label: "Career Roadmap",
    meta: "Personalized plans",
    id: "sidebar-roadmap",
  },
  {
    to: "/dashboard/buildresume",
    icon: <RiStickyNoteLine />,
    label: "Resume Builder",
    meta: "Craft a resume with AI",
    id: "sidebar-buldresume",
  },
];

const Sidebar = ({ expanded, onToggle }) => {
  return (
    <aside
      className={`control-sidebar ${expanded ? 'is-expanded' : 'is-collapsed'}`}
      aria-label="Feature navigation sidebar"
      id="dash-sidebar"
    >
      <div className="control-sidebar-head">
        {expanded && (
          <div className="control-sidebar-copy">
            <p className="control-sidebar-label">Studio deck</p>
            <p className="control-sidebar-text">
              Jump into each career module from one command rail.
            </p>
          </div>
        )}

        <button
          className="control-sidebar-toggle"
          onClick={onToggle}
          aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          id="sidebar-toggle"
          title={expanded ? 'Collapse' : 'Expand'}
        >
          {expanded ? <RiArrowLeftSLine /> : <RiArrowRightSLine />}
        </button>
      </div>

      <nav className="control-sidebar-nav" aria-label="Dashboard features">
        {sidebarItems.map(({ to, icon, label, meta, id }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `control-sidebar-item ${isActive ? 'is-active' : ''}`
            }
            id={id}
            title={!expanded ? label : undefined}
          >
            <span className="control-sidebar-icon" aria-hidden="true">
              {icon}
            </span>
            {expanded && (
              <span className="control-sidebar-item-copy">
                <span className="control-sidebar-item-label">{label}</span>
                <span className="control-sidebar-item-meta">{meta}</span>
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {expanded && (
        <div className="control-sidebar-brief">
          <span className="status-chip-dot" aria-hidden="true" />
          AI workflows online
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
