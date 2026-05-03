import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token automatically to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const aiService = {
  generate: (domain, field) =>
    api.post('/ai/generate', { domain, field }),
};

export const resumeService = {
  analyze: (formData) =>
    api.post('/resume/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export const roadmapService = {
  generate: (domain) =>
    api.post('/roadmap', { domain }),
};

export const voiceService = {
  talk: (formData) =>
    api.post('/voice/talk', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  ask: (text) =>
    api.post('/voice/ask', { text }),
};

export default api;
