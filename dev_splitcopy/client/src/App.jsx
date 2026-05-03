import { useState } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from './components/Loader';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './layout/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import About from './pages/About';
import Contact from './pages/Contact';
import Team from './pages/Team';
import NotFound from './pages/Page404';
import DomainRoadmap from './pages/DomainRoadmap';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import ResumeBuilder from './pages/ResumeBuilder';
import VoiceAssistant from './pages/VoiceAssistant';
import AiChatbot from './pages/AiChatbot';

const RequireAuth = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={<RequireAuth />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="team" element={<Team />} />
            <Route path="resume" element={<ResumeAnalyzer />} />
            <Route path="roadmap" element={<DomainRoadmap />} />
            <Route path="buildresume" element={<ResumeBuilder />} />
            <Route path="talk" element={<VoiceAssistant />} />
            <Route path="chat" element={<AiChatbot />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3500}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ fontFamily: "var(--font-body)" }}
        toastStyle={{
          background: "rgba(15, 20, 22, 0.92)",
          color: "var(--text-primary)",
          border: "1px solid rgba(122, 255, 202, 0.16)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.35)",
        }}
        progressStyle={{
          background:
            "linear-gradient(90deg, var(--accent-strong), var(--accent-soft))",
        }}
      />
    </>
  );
};

export default App;
