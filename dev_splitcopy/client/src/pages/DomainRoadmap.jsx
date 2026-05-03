import { useState } from "react";
import {
  RiRoadMapLine,
  RiCodeSSlashLine,
  RiServerLine,
  RiStackLine,
  RiBrainLine,
  RiBarChartBoxLine,
  RiShieldKeyholeLine,
  RiGitBranchLine,
  RiSmartphoneLine,
  RiSparklingLine,
} from "react-icons/ri";
import DomainCard from "../components/DomainCard";
import RoadmapModal from "../components/RoadmapModal";
import RoadmapViewer from "../components/RoadmapViewer";

const domains = [
  { name: "Frontend", icon: RiCodeSSlashLine, color: "#56d7ff" },
  { name: "Backend", icon: RiServerLine, color: "#8c98ff" },
  { name: "Full Stack", icon: RiStackLine, color: "#7affca" },
  { name: "AI/ML", icon: RiBrainLine, color: "#f5cb72" },
  { name: "Data Science", icon: RiBarChartBoxLine, color: "#ff8585" },
  { name: "Cyber Security", icon: RiShieldKeyholeLine, color: "#20e08d" },
  { name: "DevOps", icon: RiGitBranchLine, color: "#56d7ff" },
  { name: "Mobile Development", icon: RiSmartphoneLine, color: "#8c98ff" },
];

export default function DomainRoadmap() {
  const [openModal, setOpenModal] = useState(false);
  const [roadmaps, setRoadmaps] = useState([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);

  const handleDomainClick = (domainName) => {
    setOpenModal(domainName);
  };

  return (
    <div className="roadmap-page">
      {/* Background orbs */}
      <div className="roadmap-bg-orb roadmap-bg-orb-1" />
      <div className="roadmap-bg-orb roadmap-bg-orb-2" />
      <div className="roadmap-bg-orb roadmap-bg-orb-3" />

      {/* Header */}
      <div className="roadmap-page-header">
        <span className="roadmap-kicker">
          <RiSparklingLine /> AI-Powered Career Guidance
        </span>
        <h1 className="roadmap-page-title">
          Your Personalized<br />
          <span className="roadmap-title-accent">Career Roadmap</span>
        </h1>
        <p className="roadmap-page-subtitle">
          Choose a domain or create your own personalized learning roadmap
          powered by AI. Get step-by-step guidance to your dream career.
        </p>
      </div>

      {/* CTA */}
      <div className="roadmap-cta">
        <button
          className="button-primary roadmap-generate-btn"
          onClick={() => setOpenModal(true)}
        >
          <RiRoadMapLine /> Generate Custom Roadmap
        </button>
      </div>

      {/* Domain Chips */}
      <div className="roadmap-domain-grid">
        {domains.map((d, i) => (
          <DomainCard
            key={i}
            name={d.name}
            icon={d.icon}
            color={d.color}
            index={i}
            onClick={() => handleDomainClick(d.name)}
          />
        ))}
      </div>

      {/* Generated Roadmaps List */}
      {roadmaps.length > 0 && (
        <div className="roadmap-results-section">
          <h2 className="roadmap-results-title">
            <RiRoadMapLine /> Generated Roadmaps
          </h2>
          <div className="roadmap-results-grid">
            {roadmaps.map((r, i) => (
              <button
                key={i}
                className={`roadmap-result-card ${selectedRoadmap === i ? "is-active" : ""}`}
                onClick={() => setSelectedRoadmap(selectedRoadmap === i ? null : i)}
              >
                <div className="roadmap-result-card-icon">
                  <RiRoadMapLine />
                </div>
                <div className="roadmap-result-card-info">
                  <h3>{r.title || r.domain}</h3>
                  <span>{r.content?.steps?.length || 0} steps • {r.content?.tools?.length || 0} tools</span>
                </div>
                <div className="roadmap-result-card-arrow">
                  {selectedRoadmap === i ? "▼" : "▶"}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Inline Roadmap Viewer */}
      {selectedRoadmap !== null && roadmaps[selectedRoadmap] && (
        <RoadmapViewer
          data={roadmaps[selectedRoadmap]}
          close={() => setSelectedRoadmap(null)}
          inline
        />
      )}

      {/* Modal */}
      {openModal && (
        <RoadmapModal
          close={() => setOpenModal(false)}
          setRoadmaps={setRoadmaps}
          setSelectedRoadmap={setSelectedRoadmap}
          initialDomain={typeof openModal === "string" ? openModal : ""}
        />
      )}
    </div>
  );
}
