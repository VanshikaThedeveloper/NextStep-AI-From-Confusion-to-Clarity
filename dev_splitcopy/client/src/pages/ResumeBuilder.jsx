import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  RiUserLine,
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiLinkedinLine,
  RiGithubLine,
  RiGlobalLine,
  RiFileTextLine,
  RiToolsLine,
  RiBriefcaseLine,
  RiBookOpenLine,
  RiAwardLine,
  RiRobot2Line,
  RiAddLine,
  RiCloseLine,
  RiMagicLine,
} from "react-icons/ri";
import { aiService } from "../services/api";

const emptyExperience = { company: "", position: "", description: "" };
const emptyEducation = { institution: "", degree: "", year: "" };
const emptyProject = { name: "", description: "", tech: "" };

const initialState = {
  personal_info: {
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    website: "",
    summary: "",
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
};

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState(initialState);
  const [aiModal, setAiModal] = useState({ open: false, field: "" });
  const [domain, setDomain] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newCert, setNewCert] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("resumeData");
      if (saved) {
        const parsed = JSON.parse(saved);
        setResumeData({ ...initialState, ...parsed });
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  // Generic updater for personal_info fields
  const updatePersonal = useCallback((field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personal_info: { ...prev.personal_info, [field]: value },
    }));
  }, []);

  // Array field helpers
  const addArrayItem = useCallback((key, template) => {
    setResumeData((prev) => ({
      ...prev,
      [key]: [...prev[key], { ...template }],
    }));
  }, []);

  const removeArrayItem = useCallback((key, index) => {
    setResumeData((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  }, []);

  const updateArrayItem = useCallback((key, index, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [key]: prev[key].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  }, []);

  // Skill management
  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // Certification management
  const addCert = () => {
    if (newCert.trim()) {
      setResumeData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, newCert.trim()],
      }));
      setNewCert("");
    }
  };

  const removeCert = (index) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  // AI Generation
  const handleGenerateAI = async () => {
    if (!domain.trim()) {
      toast.error("Please enter a domain.");
      return;
    }

    setAiLoading(true);

    try {
      const res = await aiService.generate(domain, aiModal.field);
      const content = res.data?.content;

      if (aiModal.field === "summary") {
        updatePersonal("summary", content);
        toast.success("Summary generated!");
      } else if (aiModal.field === "skills") {
        const skillsArray = Array.isArray(content) ? content : [content];
        setResumeData((prev) => ({
          ...prev,
          skills: [...new Set([...prev.skills, ...skillsArray])],
        }));
        toast.success("Skills generated!");
      } else if (aiModal.field === "experience") {
        setResumeData((prev) => ({
          ...prev,
          experience: [
            ...prev.experience,
            { company: "", position: domain, description: content },
          ],
        }));
        toast.success("Experience generated!");
      }

      setAiModal({ open: false, field: "" });
      setDomain("");
    } catch (err) {
      const msg =
        err?.response?.data?.detail || "AI generation failed. Please try again.";
      toast.error(msg);
    } finally {
      setAiLoading(false);
    }
  };

  const { personal_info } = resumeData;

  return (
    <div className="rb-page">
      {/* Header */}
      <div className="rb-page-header">
        <span className="section-kicker">Resume Builder</span>
        <h1>Build Your Resume</h1>
        <p>
          Create a professional resume with AI assistance. Fill in the details
          and use AI to generate polished content.
        </p>
      </div>

      <div className="rb-layout">
        {/* =================== FORM =================== */}
        <div className="rb-form-card">
          {/* Personal Info */}
          <div className="rb-section">
            <div className="rb-section-header">
              <h2 className="rb-section-title">
                <RiUserLine /> Personal Information
              </h2>
            </div>
            <div className="rb-fields">
              <div className="rb-fields-row">
                <input
                  className="rb-input"
                  placeholder="Full Name"
                  value={personal_info.name}
                  onChange={(e) => updatePersonal("name", e.target.value)}
                />
                <input
                  className="rb-input"
                  placeholder="Email"
                  type="email"
                  value={personal_info.email}
                  onChange={(e) => updatePersonal("email", e.target.value)}
                />
              </div>
              <div className="rb-fields-row">
                <input
                  className="rb-input"
                  placeholder="Phone"
                  value={personal_info.phone}
                  onChange={(e) => updatePersonal("phone", e.target.value)}
                />
                <input
                  className="rb-input"
                  placeholder="Address"
                  value={personal_info.address}
                  onChange={(e) => updatePersonal("address", e.target.value)}
                />
              </div>
              <div className="rb-fields-row">
                <input
                  className="rb-input"
                  placeholder="LinkedIn URL"
                  value={personal_info.linkedin}
                  onChange={(e) => updatePersonal("linkedin", e.target.value)}
                />
                <input
                  className="rb-input"
                  placeholder="GitHub URL"
                  value={personal_info.github}
                  onChange={(e) => updatePersonal("github", e.target.value)}
                />
              </div>
              <input
                className="rb-input"
                placeholder="Portfolio / Website"
                value={personal_info.website}
                onChange={(e) => updatePersonal("website", e.target.value)}
              />
            </div>
          </div>

          {/* Summary */}
          <div className="rb-section">
            <div className="rb-section-header">
              <h2 className="rb-section-title">
                <RiFileTextLine /> Professional Summary
              </h2>
              <button
                className="rb-ai-btn"
                onClick={() => setAiModal({ open: true, field: "summary" })}
              >
                <RiRobot2Line /> Generate with AI
              </button>
            </div>
            <textarea
              className="rb-textarea"
              placeholder="Brief professional summary highlighting your key strengths..."
              value={personal_info.summary}
              onChange={(e) => updatePersonal("summary", e.target.value)}
            />
          </div>

          {/* Skills */}
          <div className="rb-section">
            <div className="rb-section-header">
              <h2 className="rb-section-title">
                <RiToolsLine /> Skills
              </h2>
              <button
                className="rb-ai-btn"
                onClick={() => setAiModal({ open: true, field: "skills" })}
              >
                <RiRobot2Line /> Generate with AI
              </button>
            </div>
            <div className="rb-skill-tags">
              {resumeData.skills.map((skill, i) => (
                <span key={i} className="rb-skill-tag">
                  {skill}
                  <button onClick={() => removeSkill(i)} aria-label="Remove skill">
                    <RiCloseLine />
                  </button>
                </span>
              ))}
            </div>
            <div className="rb-fields-row">
              <input
                className="rb-input"
                placeholder="Add a skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
              />
              <button className="rb-add-btn" onClick={addSkill}>
                <RiAddLine /> Add Skill
              </button>
            </div>
          </div>

          {/* Experience */}
          <div className="rb-section">
            <div className="rb-section-header">
              <h2 className="rb-section-title">
                <RiBriefcaseLine /> Experience
              </h2>
              <button
                className="rb-ai-btn"
                onClick={() => setAiModal({ open: true, field: "experience" })}
              >
                <RiRobot2Line /> Generate with AI
              </button>
            </div>
            {resumeData.experience.map((exp, i) => (
              <div key={i} className="rb-entry-card">
                <div className="rb-entry-header">
                  <span style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                    Experience #{i + 1}
                  </span>
                  <button
                    className="rb-remove-btn"
                    onClick={() => removeArrayItem("experience", i)}
                    aria-label="Remove experience"
                  >
                    <RiCloseLine />
                  </button>
                </div>
                <div className="rb-fields-row">
                  <input
                    className="rb-input"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) =>
                      updateArrayItem("experience", i, "company", e.target.value)
                    }
                  />
                  <input
                    className="rb-input"
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) =>
                      updateArrayItem("experience", i, "position", e.target.value)
                    }
                  />
                </div>
                <textarea
                  className="rb-textarea"
                  placeholder="Describe your role and achievements..."
                  value={exp.description}
                  onChange={(e) =>
                    updateArrayItem("experience", i, "description", e.target.value)
                  }
                />
              </div>
            ))}
            <button
              className="rb-add-btn"
              onClick={() => addArrayItem("experience", emptyExperience)}
            >
              <RiAddLine /> Add Experience
            </button>
          </div>

          {/* Education */}
          <div className="rb-section">
            <div className="rb-section-header">
              <h2 className="rb-section-title">
                <RiBookOpenLine /> Education
              </h2>
            </div>
            {resumeData.education.map((edu, i) => (
              <div key={i} className="rb-entry-card">
                <div className="rb-entry-header">
                  <span style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                    Education #{i + 1}
                  </span>
                  <button
                    className="rb-remove-btn"
                    onClick={() => removeArrayItem("education", i)}
                    aria-label="Remove education"
                  >
                    <RiCloseLine />
                  </button>
                </div>
                <div className="rb-fields-row">
                  <input
                    className="rb-input"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) =>
                      updateArrayItem("education", i, "institution", e.target.value)
                    }
                  />
                  <input
                    className="rb-input"
                    placeholder="Degree / Field"
                    value={edu.degree}
                    onChange={(e) =>
                      updateArrayItem("education", i, "degree", e.target.value)
                    }
                  />
                </div>
                <input
                  className="rb-input"
                  placeholder="Year (e.g. 2020-2024)"
                  value={edu.year}
                  onChange={(e) =>
                    updateArrayItem("education", i, "year", e.target.value)
                  }
                />
              </div>
            ))}
            <button
              className="rb-add-btn"
              onClick={() => addArrayItem("education", emptyEducation)}
            >
              <RiAddLine /> Add Education
            </button>
          </div>

          {/* Projects */}
          <div className="rb-section">
            <div className="rb-section-header">
              <h2 className="rb-section-title">
                <RiGlobalLine /> Projects
              </h2>
            </div>
            {resumeData.projects.map((proj, i) => (
              <div key={i} className="rb-entry-card">
                <div className="rb-entry-header">
                  <span style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                    Project #{i + 1}
                  </span>
                  <button
                    className="rb-remove-btn"
                    onClick={() => removeArrayItem("projects", i)}
                    aria-label="Remove project"
                  >
                    <RiCloseLine />
                  </button>
                </div>
                <input
                  className="rb-input"
                  placeholder="Project Name"
                  value={proj.name}
                  onChange={(e) =>
                    updateArrayItem("projects", i, "name", e.target.value)
                  }
                />
                <textarea
                  className="rb-textarea"
                  placeholder="Project description..."
                  value={proj.description}
                  onChange={(e) =>
                    updateArrayItem("projects", i, "description", e.target.value)
                  }
                />
                <input
                  className="rb-input"
                  placeholder="Technologies used"
                  value={proj.tech}
                  onChange={(e) =>
                    updateArrayItem("projects", i, "tech", e.target.value)
                  }
                />
              </div>
            ))}
            <button
              className="rb-add-btn"
              onClick={() => addArrayItem("projects", emptyProject)}
            >
              <RiAddLine /> Add Project
            </button>
          </div>

          {/* Certifications */}
          <div className="rb-section">
            <div className="rb-section-header">
              <h2 className="rb-section-title">
                <RiAwardLine /> Certifications
              </h2>
            </div>
            {resumeData.certifications.map((cert, i) => (
              <div key={i} className="rb-skill-tag">
                {cert}
                <button onClick={() => removeCert(i)} aria-label="Remove certification">
                  <RiCloseLine />
                </button>
              </div>
            ))}
            <div className="rb-fields-row">
              <input
                className="rb-input"
                placeholder="Add certification..."
                value={newCert}
                onChange={(e) => setNewCert(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCert()}
              />
              <button className="rb-add-btn" onClick={addCert}>
                <RiAddLine /> Add
              </button>
            </div>
          </div>
        </div>

        {/* =================== PREVIEW =================== */}
        <div className="rb-preview-card">
          <h2>
            <RiMagicLine style={{ color: "var(--accent-soft)", marginRight: "0.4rem" }} />
            Live Preview
          </h2>

          {/* Name & Contact */}
          {personal_info.name && (
            <div className="rb-preview-section" style={{ borderTop: "none", paddingTop: 0 }}>
              <h3 style={{ color: "var(--text-primary)", fontSize: "1.2rem" }}>
                {personal_info.name}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                {[personal_info.email, personal_info.phone, personal_info.address]
                  .filter(Boolean)
                  .join(" • ")}
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                {[personal_info.linkedin, personal_info.github, personal_info.website]
                  .filter(Boolean)
                  .join(" • ")}
              </p>
            </div>
          )}

          {/* Summary */}
          {personal_info.summary && (
            <div className="rb-preview-section">
              <h3>Summary</h3>
              <p>{personal_info.summary}</p>
            </div>
          )}

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <div className="rb-preview-section">
              <h3>Skills</h3>
              <div className="rb-skill-tags">
                {resumeData.skills.map((skill, i) => (
                  <span key={i} className="rb-skill-tag" style={{ cursor: "default" }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <div className="rb-preview-section">
              <h3>Experience</h3>
              {resumeData.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: "0.6rem" }}>
                  {(exp.position || exp.company) && (
                    <p style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                      {exp.position}
                      {exp.company && ` at ${exp.company}`}
                    </p>
                  )}
                  {exp.description && <p>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <div className="rb-preview-section">
              <h3>Education</h3>
              {resumeData.education.map((edu, i) => (
                <p key={i}>
                  <strong>{edu.degree}</strong>
                  {edu.institution && ` — ${edu.institution}`}
                  {edu.year && ` (${edu.year})`}
                </p>
              ))}
            </div>
          )}

          {/* Projects */}
          {resumeData.projects.length > 0 && (
            <div className="rb-preview-section">
              <h3>Projects</h3>
              {resumeData.projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: "0.5rem" }}>
                  <p style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                    {proj.name}
                  </p>
                  {proj.description && <p>{proj.description}</p>}
                  {proj.tech && (
                    <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                      Tech: {proj.tech}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {resumeData.certifications.length > 0 && (
            <div className="rb-preview-section">
              <h3>Certifications</h3>
              <ul>
                {resumeData.certifications.map((cert, i) => (
                  <li key={i}>{cert}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Empty State */}
          {!personal_info.name &&
            !personal_info.summary &&
            resumeData.skills.length === 0 &&
            resumeData.experience.length === 0 && (
              <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "2rem 0" }}>
                Fill in the form to see your resume preview here.
              </p>
            )}
        </div>
      </div>

      {/* =================== AI MODAL =================== */}
      {aiModal.open && (
        <div className="rb-modal-overlay" onClick={() => setAiModal({ open: false, field: "" })}>
          <div className="rb-modal" onClick={(e) => e.stopPropagation()}>
            <h2>
              <RiRobot2Line style={{ color: "var(--accent-soft)", marginRight: "0.4rem" }} />
              Generate {aiModal.field} with AI
            </h2>
            <p>Enter your target domain/role and we'll generate professional {aiModal.field} content.</p>

            <input
              className="rb-input"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g. Frontend Developer, Data Scientist..."
              onKeyDown={(e) => e.key === "Enter" && handleGenerateAI()}
              autoFocus
            />

            <div className="rb-modal-actions">
              <button
                className="button-secondary"
                onClick={() => setAiModal({ open: false, field: "" })}
              >
                Cancel
              </button>
              <button
                className="button-primary"
                onClick={handleGenerateAI}
                disabled={aiLoading}
              >
                {aiLoading ? (
                  <>
                    <span className="inline-spinner" /> Generating...
                  </>
                ) : (
                  "Generate"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
