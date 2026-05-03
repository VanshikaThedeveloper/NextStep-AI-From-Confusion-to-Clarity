import { useEffect, useState } from 'react';

const Loader = ({ onFinish }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2400);
    const doneTimer = setTimeout(() => onFinish?.(), 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`loader-screen ${fading ? 'fade-out' : ''}`}
      role="status"
      aria-label="Loading Dev_Split"
    >
      <div className="loader-grid" aria-hidden="true" />

      <div className="loader-content">
        <div className="loader-brand-lockup">
          <div className="brand-mark loader-brand">
            <span className="brand-mark-cube" aria-hidden="true" />
            <span className="brand-mark-copy">
              Dev<span>_Split</span>
            </span>
          </div>
          <p className="loader-tagline">AI Career Studio</p>
        </div>

        <div className="loader-core" aria-hidden="true">
          <div className="loader-core-ring loader-core-ring-1" />
          <div className="loader-core-ring loader-core-ring-2" />
          <div className="loader-core-chip">
            <span />
          </div>
        </div>

        <div className="loader-progress">
          <div className="loader-progress-bar" />
        </div>

        <p className="loader-message">Calibrating your next career move...</p>
      </div>
    </div>
  );
};

export default Loader;
