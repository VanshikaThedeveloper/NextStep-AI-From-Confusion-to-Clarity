import { useEffect, useRef, useState } from 'react';

const StatCard = ({
  icon,
  title,
  count = 0,
  color = '#7affca',
  accentBg = 'rgba(122, 255, 202, 0.12)',
  caption = 'Waiting for your next move',
}) => {
  const [displayCount, setDisplayCount] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);
  const hasAnimated = useRef(false);
  const cardRef = useRef(null);

  const radius = 38;
  const stroke = 5;
  const circumference = 2 * Math.PI * radius;
  const fillPercent = Math.max(Math.min(count, 100), 6);
  const animatedDashOffset =
    circumference - (animationProgress / 100) * (fillPercent / 100) * circumference;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) {
          return;
        }

        hasAnimated.current = true;

        const duration = 1100;
        const steps = 55;
        const increment = count / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
          currentStep += 1;
          setDisplayCount(Math.min(Math.round(increment * currentStep), count));
          setAnimationProgress(Math.min((currentStep / steps) * 100, 100));

          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, duration / steps);
      },
      { threshold: 0.35 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [count]);

  return (
    <article ref={cardRef} className="signal-card" aria-label={`${title}: ${count}`}>
      <div className="signal-card-ring-wrap">
        <svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          className="signal-ring-svg"
          aria-hidden="true"
        >
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth={stroke}
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={count === 0 ? circumference : animatedDashOffset}
            transform="rotate(-90 48 48)"
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
        </svg>

        <div
          className="signal-card-icon"
          style={{ background: accentBg, color }}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>

      <div className="signal-card-count" style={{ color }}>
        {displayCount}
      </div>
      <p className="signal-card-title">{title}</p>
      <p className="signal-card-caption">{caption}</p>
    </article>
  );
};

export default StatCard;
