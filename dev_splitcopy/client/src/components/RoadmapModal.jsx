import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { roadmapService } from "../services/api";
import { RiRoadMapLine, RiLoaderLine } from "react-icons/ri";

export default function RoadmapModal({ close, setRoadmaps, setSelectedRoadmap, initialDomain = "" }) {
  const [domain, setDomain] = useState(initialDomain);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialDomain) setDomain(initialDomain);
  }, [initialDomain]);

  const handleSubmit = async () => {
    if (!domain.trim()) {
      toast.error("Please enter a domain.");
      return;
    }

    setLoading(true);

    try {
      const res = await roadmapService.generate(domain);

      setRoadmaps((prev) => {
        const updated = [
          ...prev,
          {
            domain,
            title: res.data.title || `${domain} Roadmap`,
            content: res.data.content || res.data,
          },
        ];
        // Auto-select the newly generated roadmap
        if (setSelectedRoadmap) {
          setSelectedRoadmap(updated.length - 1);
        }
        return updated;
      });

      toast.success("Roadmap generated successfully!");
      close();
    } catch (err) {
      const msg =
        err?.response?.data?.detail || "Error generating roadmap. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="roadmap-modal-overlay" onClick={close}>
      <div className="roadmap-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal glow */}
        <div className="roadmap-modal-glow" />

        <div className="roadmap-modal-header">
          <div className="roadmap-modal-icon">
            <RiRoadMapLine />
          </div>
          <h2>Generate a Roadmap</h2>
          <p>
            Enter a domain, role, or technology and AI will create a
            personalized step-by-step learning roadmap for you.
          </p>
        </div>

        <div className="roadmap-modal-body">
          <label className="roadmap-modal-label" htmlFor="roadmap-domain-input">
            Domain / Role
          </label>
          <input
            id="roadmap-domain-input"
            className="roadmap-modal-input"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="e.g. Frontend Developer, Data Scientist, DevOps Engineer..."
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            autoFocus
          />
        </div>

        <div className="roadmap-modal-actions">
          <button className="button-secondary" onClick={close}>
            Cancel
          </button>
          <button
            className="button-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <RiLoaderLine className="spinning" /> Generating...
              </>
            ) : (
              <>
                <RiRoadMapLine /> Generate Roadmap
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
