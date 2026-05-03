import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RiMailLine, RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

import { authService } from '../services/api';

const loginPerks = [
  'Resume, interview, notes, and voice practice in one dark-mode workspace.',
  'Smooth access back into your dashboard without losing your progress.',
  'Premium visual shell that matches the new studio system across the app.',
];

const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    const validationErrors = {};

    if (!form.email.trim()) {
      validationErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      validationErrors.email = 'Enter a valid email address.';
    }

    if (!form.password) {
      validationErrors.password = 'Password is required.';
    }

    return validationErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: '' }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await authService.login(form);
      const data = res?.data ?? {};
      const token =
        data.token ||
        data.access_token ||
        data.accessToken ||
        data.data?.token ||
        data.data?.access_token;

      const userName =
        data.name ||
        data.username ||
        data.user?.name ||
        data.user?.username ||
        data.data?.name ||
        form.email.split('@')[0];

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', userName);
        toast.success(`Welcome back, ${userName}!`);
        navigate('/dashboard', { replace: true });
      } else {
        toast.error('Login response was missing an auth token. Please try again.');
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        err?.message ||
        'Login failed. Please check your credentials.';

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" aria-label="Login page">
      <div className="site-shell auth-layout">
        <section className="auth-story">
          <Link to="/" className="brand-mark auth-brand" aria-label="Go to home">
            <span className="brand-mark-cube" aria-hidden="true" />
            <span className="brand-mark-copy">
              Dev<span>_Split</span>
            </span>
          </Link>

          <div className="auth-story-copy">
            <span className="eyebrow-pill">Studio access</span>
            <h1>Return to your career command center.</h1>
            <p>
              Sign back in to continue refining resumes, rehearsing interviews,
              and tracking the small improvements that add up.
            </p>
          </div>

          <div className="auth-story-card">
            <div className="status-chip">
              <span className="status-chip-dot" aria-hidden="true" />
              Session ready
            </div>
            <ul className="auth-perk-list">
              {loginPerks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </div>
        </section>

        <main className="auth-panel" role="main">
          <div className="auth-panel-head">
            <h2>Welcome back</h2>
            <p>Sign in to pick up exactly where your last prep session left off.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="auth-form">
            <div className="auth-field">
              <label className="auth-label" htmlFor="login-email">
                Email Address
              </label>
              <div className="auth-input-shell">
                <RiMailLine className="auth-input-icon" aria-hidden="true" />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`auth-input ${errors.email ? 'is-error' : ''}`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'login-email-error' : undefined}
                />
              </div>
              {errors.email && (
                <p className="auth-error" id="login-email-error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="auth-field">
              <div className="auth-field-row">
                <label className="auth-label" htmlFor="login-password">
                  Password
                </label>
                <a href="#forgot" className="auth-inline-link" id="login-forgot-link">
                  Forgot password?
                </a>
              </div>

              <div className="auth-input-shell">
                <RiLockPasswordLine className="auth-input-icon" aria-hidden="true" />
                <input
                  id="login-password"
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`auth-input ${errors.password ? 'is-error' : ''}`}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'login-password-error' : undefined}
                />
                <button
                  type="button"
                  className="auth-input-toggle"
                  onClick={() => setShowPass((current) => !current)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                  id="login-password-toggle"
                >
                  {showPass ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
              {errors.password && (
                <p className="auth-error" id="login-password-error" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="auth-submit"
              id="login-submit-btn"
              disabled={loading}
            >
              {loading ? 'Signing you in...' : 'Enter the studio'}
            </button>
          </form>

          <p className="auth-footer-text">
            Do not have an account?{' '}
            <Link to="/register" className="auth-footer-link" id="login-register-link">
              Create one
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;
