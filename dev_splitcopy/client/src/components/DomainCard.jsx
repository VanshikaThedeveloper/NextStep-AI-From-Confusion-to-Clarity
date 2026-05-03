export default function DomainCard({ name, icon: Icon, color, index, onClick }) {
  return (
    <button
      className="roadmap-domain-card"
      onClick={onClick}
      style={{
        "--card-accent": color,
        "--card-delay": `${index * 60}ms`,
      }}
    >
      <div className="roadmap-domain-card-icon">
        {Icon && <Icon />}
      </div>
      <span className="roadmap-domain-card-name">{name}</span>
      <div className="roadmap-domain-card-glow" />
    </button>
  );
}
