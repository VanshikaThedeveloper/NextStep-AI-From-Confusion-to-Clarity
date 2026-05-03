import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <span className="section-kicker">404</span>
        <h1>That page drifted out of the studio.</h1>
        <p>
          The route you requested does not exist here anymore, or it is waiting to
          be wired into the next module.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="button-secondary">
            Back to landing
          </Link>
          <Link to="/dashboard" className="button-primary">
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
