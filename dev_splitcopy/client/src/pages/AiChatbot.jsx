import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  RiRobot2Line, 
  RiUser3Line, 
  RiSendPlane2Fill, 
  RiArrowRightLine,
  RiInformationLine,
  RiChatSmile3Line
} from "react-icons/ri";

const API = "http://localhost:8000/chat";

/* ──────────────────────── Icons ─────────────────────────── */
const SendIcon = () => <RiSendPlane2Fill size={18} />;
const ArrowIcon = () => <RiArrowRightLine size={18} />;

const AiChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [domain, setDomain] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [started, setStarted] = useState(false);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  /* ── Auto-scroll to bottom on new messages ── */
  useEffect(() => {
    if (started) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, started]);

  /* ── Focus input after chat starts ── */
  useEffect(() => {
    if (started && inputRef.current) {
      inputRef.current.focus();
    }
  }, [started]);

  /* ── Start Chat (User Setup) ── */
  const startChat = useCallback(async () => {
    if (!domain.trim()) return;

    setStarted(true);
    setLoading(true);

    try {
      await fetch(`${API}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "user1",
          domain,
          level,
        }),
      });

      setMessages([
        {
          role: "bot",
          text: `Hi there! I'm your AI learning companion. I've set up a personalized path for you to master **${domain}** at the **${level}** level. How would you like to start?`,
        },
      ]);
    } catch {
      setMessages([
        {
          role: "bot",
          text: `Welcome! Let's dive into **${domain}** (${level}). I'm ready to answer any questions or guide you through core concepts. What's on your mind? 🚀`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [domain, level]);

  /* ── Send Message ── */
  const sendMessage = useCallback(async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const newMessages = [...messages, { role: "user", text: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "user1",
          message: userText,
        }),
      });

      const data = await res.json();
      setMessages([...newMessages, { role: "bot", text: data.reply }]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "bot", text: "I'm having trouble connecting to my brain right now. Please try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  /* ── Handle Enter key ── */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  /* ────────────────── START SCREEN ────────────────── */
  if (!started) {
    return (
      <div className="aichat-start-container">
        <div className="aichat-start-card">
          <div className="eyebrow-pill">
            <span className="status-chip-dot" />
            AI Learning Engine
          </div>

          <h1 className="aichat-title">
            Unlock <span>Intelligence</span>
          </h1>

          <p className="aichat-subtitle">
            Personalize your AI companion to match your learning goals and expertise level.
          </p>

          <div className="aichat-form">
            <div className="aichat-field">
              <label className="section-kicker">Domain of Interest</label>
              <input
                id="chat-domain-input"
                className="aichat-input-field"
                type="text"
                placeholder="e.g. Frontend Development, Data Science..."
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && domain.trim() && startChat()}
              />
            </div>

            <div className="aichat-field">
              <label className="section-kicker">Experience Level</label>
              <select
                id="chat-level-select"
                className="aichat-select-field"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="Beginner">Beginner (Starting discovery)</option>
                <option value="Intermediate">Intermediate (Building depth)</option>
                <option value="Advanced">Advanced (Mastering edge cases)</option>
              </select>
            </div>
          </div>

          <button
            id="chat-start-btn"
            className="button-primary w-full"
            onClick={startChat}
            disabled={!domain.trim()}
          >
            Go to Workspace <ArrowIcon />
          </button>
        </div>
      </div>
    );
  }

  /* ────────────────── CHAT UI ────────────────── */
  return (
    <div className="aichat-workspace">
      {/* ── Header ── */}
      <header className="aichat-workspace-header">
        <div className="aichat-header-info">
          <div className="aichat-header-icon">
            <RiRobot2Line className="text-accent-soft" size={24} />
          </div>
          <div>
            <h3>Learning Assistant</h3>
            <p>{domain} · {level}</p>
          </div>
        </div>
        <div className="aichat-header-actions">
          <div className="status-chip">
            <span className="status-chip-dot" />
            Active Session
          </div>
        </div>
      </header>

      {/* ── Messages Feed ── */}
      <main className="aichat-feed">
        <div className="aichat-feed-inner">
          {messages.length === 0 && !loading ? (
            <div className="aichat-welcome">
              <RiChatSmile3Line size={64} className="aichat-welcome-icon" />
              <h2>Knowledge Portal Initialized</h2>
              <p>Your session for <strong>{domain}</strong> is active. Ask me anything to begin exploring.</p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`aichat-msg-row ${msg.role === "user" ? "is-user" : "is-bot"}`}>
                <div className="aichat-avatar">
                  {msg.role === "user" ? <RiUser3Line /> : <RiRobot2Line />}
                </div>
                <div className="aichat-bubble-wrapper">
                  <div className="aichat-bubble">
                    {msg.text}
                  </div>
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="aichat-msg-row is-bot">
              <div className="aichat-avatar">
                <RiRobot2Line />
              </div>
              <div className="aichat-typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </main>

      {/* ── Input Composite ── */}
      <footer className="aichat-composer">
        <div className="aichat-composer-inner">
          <div className="aichat-input-container">
            <textarea
              ref={inputRef}
              id="chat-message-input"
              rows={Math.min(input.split("\n").length, 5)}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message AI about ${domain}...`}
              disabled={loading}
              autoComplete="off"
            />
            <button
              id="chat-send-btn"
              className="aichat-send-trigger"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </div>
          <p className="aichat-composer-hint">
            <RiInformationLine /> AI can make mistakes. Check important information.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AiChatbot;