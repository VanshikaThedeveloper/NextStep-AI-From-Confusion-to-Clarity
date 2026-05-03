import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  RiEyeLine,
  RiEyeOffLine,
  RiLockPasswordLine,
  RiMailLine,
  RiUserLine,
} from 'react-icons/ri';

import { authService } from '../services/api';

const launchBenefits = [
  'Start with a unified workspace for resumes, interviews, notes, and voice prep.',
  'Move from scattered tools to one focused system with a distinct visual identity.',
  'Keep the existing backend flow intact while stepping into the new interface.',
];

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    const validationErrors = {};

    if (!form.name.trim()) {
      validationErrors.name = 'Full name is required.';
    }

    if (!form.email.trim()) {
      validationErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      validationErrors.email = 'Enter a valid email address.';
    }

    if (!form.password) {
      validationErrors.password = 'Password is required.';
    } else if (form.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters.';
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
      const res = await authService.register(form);
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
        form.name;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', userName);
        toast.success(`Account created! Welcome to Dev_Split, ${userName}.`);
        navigate('/dashboard');
      } else {
        toast.success('Registration successful! Please sign in to continue.');
        navigate('/login');
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        err?.message ||
        'Registration failed. Please try again.';

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" aria-label="Register page">
      <div className="site-shell auth-layout">
        <section className="auth-story">
          <Link to="/" className="brand-mark auth-brand" aria-label="Go to home">
            <span className="brand-mark-cube" aria-hidden="true" />
            <span className="brand-mark-copy">
              Dev<span>_Split</span>
            </span>
          </Link>

          <div className="auth-story-copy">
            <span className="eyebrow-pill">New launch</span>
            <h1>Create your personal career studio.</h1>
            <p>
              Set up your account and move into a more polished workspace for
              resume strategy, interview practice, and intentional growth.
            </p>
          </div>

          <div className="auth-story-card">
            <div className="status-chip">
              <span className="status-chip-dot" aria-hidden="true" />
              Ready for onboarding
            </div>
            <ul className="auth-perk-list">
              {launchBenefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
        </section>

        <main className="auth-panel" role="main">
          <div className="auth-panel-head">
            <h2>Create your account</h2>
            <p>Join the studio and start shaping a stronger hiring story.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="auth-form">
            <div className="auth-field">
              <label className="auth-label" htmlFor="register-name">
                Full Name
              </label>
              <div className="auth-input-shell">
                <RiUserLine className="auth-input-icon" aria-hidden="true" />
                <input
                  id="register-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={`auth-input ${errors.name ? 'is-error' : ''}`}
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'register-name-error' : undefined}
                />
              </div>
              {errors.name && (
                <p className="auth-error" id="register-name-error" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="register-email">
                Email Address
              </label>
              <div className="auth-input-shell">
                <RiMailLine className="auth-input-icon" aria-hidden="true" />
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`auth-input ${errors.email ? 'is-error' : ''}`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'register-email-error' : undefined}
                />
              </div>
              {errors.email && (
                <p className="auth-error" id="register-email-error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="register-password">
                Password
              </label>
              <div className="auth-input-shell">
                <RiLockPasswordLine className="auth-input-icon" aria-hidden="true" />
                <input
                  id="register-password"
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="new-password"
                  className={`auth-input ${errors.password ? 'is-error' : ''}`}
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? 'register-password-error' : undefined
                  }
                />
                <button
                  type="button"
                  className="auth-input-toggle"
                  onClick={() => setShowPass((current) => !current)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                  id="register-password-toggle"
                >
                  {showPass ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
              {errors.password && (
                <p
                  className="auth-error"
                  id="register-password-error"
                  role="alert"
                >
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="auth-submit"
              id="register-submit-btn"
              disabled={loading}
            >
              {loading ? 'Creating your studio...' : 'Create account'}
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account?{' '}
            <Link to="/login" className="auth-footer-link" id="register-login-link">
              Sign in
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
};

export default RegisterPage;
