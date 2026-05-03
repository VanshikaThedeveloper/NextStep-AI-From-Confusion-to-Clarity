import { useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import {
  RiUploadCloud2Line,
  RiFileTextLine,
  RiCloseLine,
  RiSearchEyeLine,
  RiCheckboxCircleLine,
  RiAlertLine,
  RiLightbulbLine,
  RiCodeSSlashLine,
} from "react-icons/ri";
import { resumeService } from "../services/api";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = useCallback((selectedFile) => {
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      toast.error("Please upload a PDF file only.");
    }
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) handleFileSelect(selected);
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFileSelect(dropped);
    },
    [handleFileSelect]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please upload a resume first.");
      return;
    }

    setLoading(true);
    setData(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("job_title", jobTitle || "Software Developer");
      formData.append(
        "job_description",
        jobDescription || "General software development role"
      );

      const res = await resumeService.analyze(formData);
      setData(res.data);
      toast.success("Resume analysis complete!");
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.message ||
        "Error analyzing resume. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const scoreColor =
    data?.match_score >= 70
      ? "var(--accent-soft)"
      : data?.match_score >= 40
      ? "var(--accent-gold)"
      : "var(--danger)";

  const circumference = 2 * Math.PI * 50;
  const scoreOffset = data
    ? circumference - (data.match_score / 100) * circumference
    : circumference;

  return (
    <div className="ra-page">
      {/* Loading Overlay */}
      {loading && (
        <div className="page-loader">
          <div className="page-loader-content">
            <div className="page-loader-spinner" />
            <p>Analyzing your resume with AI...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="ra-page-header">
        <span className="section-kicker">Resume Radar</span>
        <h1>Analyze Your Resume</h1>
        <p>
          Upload your resume and get AI-powered feedback on ATS compatibility,
          strengths, gaps, and actionable suggestions.
        </p>
      </div>

      {/* Upload Card */}
      <div className="ra-upload-card">
        {/* Dropzone */}
        <div
          className={`ra-dropzone ${dragOver ? "is-dragover" : ""} ${
            file ? "has-file" : ""
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <div className="ra-dropzone-icon">
            <RiUploadCloud2Line />
          </div>

          <p className="ra-dropzone-text">
            {file ? (
              <>
                File selected: <strong>{file.name}</strong>
              </>
            ) : (
              <>
                <strong>Click to upload</strong> or drag and drop your resume
              </>
            )}
          </p>
          <p className="ra-dropzone-hint">PDF files only • Max 10MB</p>
        </div>

        {/* File Info */}
        {file && (
          <div className="ra-file-info">
            <RiFileTextLine />
            <span>{file.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                setData(null);
              }}
              aria-label="Remove file"
            >
              <RiCloseLine />
            </button>
          </div>
        )}

        {/* Job Fields */}
        <div className="ra-fields">
          <div className="ra-field">
            <label htmlFor="ra-job-title">Job Title</label>
            <input
              id="ra-job-title"
              className="rb-input"
              placeholder="e.g. Frontend Developer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <div className="ra-field">
            <label htmlFor="ra-job-desc">Job Description</label>
            <input
              id="ra-job-desc"
              className="rb-input"
              placeholder="e.g. React, TypeScript, UI development"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Analyze Button */}
        <button
          className="ra-analyze-btn"
          onClick={handleAnalyze}
          disabled={loading || !file}
        >
          {loading ? (
            <>
              <span className="inline-spinner" /> Analyzing...
            </>
          ) : (
            <>
              <RiSearchEyeLine /> Analyze Resume
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {data && (
        <div className="ra-results">
          <div className="ra-results-header">
            <h2>Analysis Results</h2>
          </div>

          {/* Score Section */}
          <div className="ra-score-section">
            <div className="ra-score-ring">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.06)"
                  strokeWidth="6"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke={scoreColor}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={scoreOffset}
                  style={{ transition: "stroke-dashoffset 1s ease" }}
                />
              </svg>
              <div className="ra-score-value" style={{ color: scoreColor }}>
                {data.match_score}%
              </div>
            </div>
            <div className="ra-score-info">
              <h3>Match Score</h3>
              <p>{data.summary}</p>
            </div>
          </div>

          {/* Result Cards Grid */}
          <div className="ra-result-grid">
            {/* Strengths */}
            {data.strengths?.length > 0 && (
              <div className="ra-result-card is-strengths">
                <h3>
                  <RiCheckboxCircleLine /> Strengths
                </h3>
                <ul className="ra-result-list">
                  {data.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Weaknesses */}
            {data.weaknesses?.length > 0 && (
              <div className="ra-result-card is-weaknesses">
                <h3>
                  <RiAlertLine /> Weaknesses
                </h3>
                <ul className="ra-result-list">
                  {data.weaknesses.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggestions */}
            {data.suggestions?.length > 0 && (
              <div className="ra-result-card is-suggestions">
                <h3>
                  <RiLightbulbLine /> Suggestions
                </h3>
                <ul className="ra-result-list">
                  {data.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Missing Skills */}
            {data.missing_skills?.length > 0 && (
              <div className="ra-result-card is-skills">
                <h3>
                  <RiCodeSSlashLine /> Missing Skills
                </h3>
                <div className="ra-tag-list">
                  {data.missing_skills.map((s, i) => (
                    <span key={i} className="ra-tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
