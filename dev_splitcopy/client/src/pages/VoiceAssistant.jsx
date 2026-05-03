import { useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import {
  RiMicLine,
  RiStopCircleLine,
  RiSendPlaneLine,
  RiLightbulbLine,
  RiCheckboxCircleLine,
  RiStarLine,
  RiChatSmile2Line,
  RiDeleteBinLine,
} from "react-icons/ri";
import { voiceService } from "../services/api";

const VoiceAssistant = () => {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [conversations, setConversations] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const conversationEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const addConversation = useCallback(
    (userText, aiResponse) => {
      setConversations((prev) => [
        ...prev,
        { id: Date.now(), userText, aiResponse },
      ]);
      scrollToBottom();
    },
    [scrollToBottom]
  );

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        sendAudio();
        stream.getTracks().forEach((track) => track.stop());
      };

      audioChunks.current = [];
      mediaRecorder.start();
      setRecording(true);
    } catch {
      toast.error("Microphone access denied. Please allow microphone access.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const sendAudio = async () => {
    const blob = new Blob(audioChunks.current, { type: "audio/wav" });
    const formData = new FormData();
    formData.append("audio", blob, "voice.wav");

    setLoading(true);

    try {
      const res = await voiceService.talk(formData);
      const { user_text, ai_response } = res.data;
      addConversation(user_text, ai_response);

      // Speak the summary
      if (ai_response.summary && window.speechSynthesis) {
        const speech = new SpeechSynthesisUtterance(ai_response.summary);
        speech.rate = 0.95;
        window.speechSynthesis.speak(speech);
      }
    } catch (err) {
      const msg =
        err?.response?.data?.detail || "Voice processing failed. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const sendText = async () => {
    if (!textInput.trim()) {
      toast.error("Please type a question.");
      return;
    }

    setLoading(true);
    const query = textInput.trim();
    setTextInput("");

    try {
      const res = await voiceService.ask(query);
      const { user_text, ai_response } = res.data;
      addConversation(user_text, ai_response);
    } catch (err) {
      const msg =
        err?.response?.data?.detail || "AI processing failed. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const clearConversations = () => {
    setConversations([]);
    window.speechSynthesis?.cancel();
  };

  return (
    <div className="va-page">
      {/* Header */}
      <div className="va-header">
        <span className="section-kicker">AI Career Coach</span>
        <h1>Voice Assistant</h1>
        <p>
          Ask anything about your career — by voice or text. Get structured,
          actionable AI guidance instantly.
        </p>
      </div>

      {/* Input Area */}
      <div className="va-input-card">
        {/* Mic Button */}
        <div className="va-mic-area">
          <button
            className={`va-mic-btn ${recording ? "is-recording" : ""} ${
              loading ? "is-loading" : ""
            }`}
            onClick={recording ? stopRecording : startRecording}
            disabled={loading}
            aria-label={recording ? "Stop recording" : "Start recording"}
          >
            <span className="va-mic-pulse" />
            <span className="va-mic-icon">
              {recording ? <RiStopCircleLine /> : <RiMicLine />}
            </span>
          </button>
          <p className="va-mic-hint">
            {loading
              ? "Processing..."
              : recording
              ? "Listening... tap to stop"
              : "Tap to speak"}
          </p>
        </div>

        {/* Divider */}
        <div className="va-divider">
          <span>or type your question</span>
        </div>

        {/* Text Input */}
        <div className="va-text-input-row">
          <input
            className="rb-input"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="e.g. How do I become a frontend developer?"
            onKeyDown={(e) => e.key === "Enter" && !loading && sendText()}
            disabled={loading}
          />
          <button
            className="va-send-btn"
            onClick={sendText}
            disabled={loading || !textInput.trim()}
            aria-label="Send"
          >
            {loading ? (
              <span className="inline-spinner" />
            ) : (
              <RiSendPlaneLine />
            )}
          </button>
        </div>
      </div>

      {/* Conversations */}
      {conversations.length > 0 && (
        <div className="va-conversations">
          <div className="va-conversations-header">
            <h2>Conversation</h2>
            <button className="va-clear-btn" onClick={clearConversations}>
              <RiDeleteBinLine /> Clear
            </button>
          </div>

          {conversations.map((conv) => (
            <div key={conv.id} className="va-conversation-item">
              {/* User Message */}
              <div className="va-user-bubble">
                <RiChatSmile2Line className="va-user-icon" />
                <p>{conv.userText}</p>
              </div>

              {/* AI Response */}
              <div className="va-ai-response">
                {/* Title */}
                {conv.aiResponse.title && (
                  <h3 className="va-response-title">{conv.aiResponse.title}</h3>
                )}

                {/* Summary */}
                {conv.aiResponse.summary && (
                  <p className="va-response-summary">
                    {conv.aiResponse.summary}
                  </p>
                )}

                {/* Key Points */}
                {conv.aiResponse.key_points?.length > 0 && (
                  <div className="va-response-section">
                    <h4>
                      <RiLightbulbLine /> Key Points
                    </h4>
                    <ul className="va-response-list">
                      {conv.aiResponse.key_points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Items */}
                {conv.aiResponse.action_items?.length > 0 && (
                  <div className="va-response-section">
                    <h4>
                      <RiCheckboxCircleLine /> Action Items
                    </h4>
                    <ul className="va-response-list is-actions">
                      {conv.aiResponse.action_items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Encouragement */}
                {conv.aiResponse.encouragement && (
                  <div className="va-encouragement">
                    <RiStarLine />
                    <span>{conv.aiResponse.encouragement}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div ref={conversationEndRef} />
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="va-loading-indicator">
          <div className="page-loader-spinner" />
          <p>AI is thinking...</p>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
