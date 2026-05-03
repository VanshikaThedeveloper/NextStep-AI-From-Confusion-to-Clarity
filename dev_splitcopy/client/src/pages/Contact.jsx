import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  RiMailLine,
  RiMapPinLine,
  RiMessage2Line,
  RiPhoneLine,
  RiSendPlaneLine,
  RiTimeLine,
  RiUserLine,
} from 'react-icons/ri';

import DashboardFooter from '../components/DashboardFooter';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const validationErrors = {};

    if (!form.name.trim()) {
      validationErrors.name = 'Name is required';
    }

    if (!form.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      validationErrors.email = 'Invalid email address';
    }

    if (!form.message.trim()) {
      validationErrors.message = 'Message is required';
    } else if (form.message.trim().length < 20) {
      validationErrors.message = 'Message must be at least 20 characters';
    }

    return validationErrors;
  };

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));

    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm({ name: '', email: '', message: '' });
      setErrors({});
      setLoading(false);
    }, 1400);
  };

  return (
    <div className="info-page">
      <section className="info-hero" aria-labelledby="contact-heading">
        <span className="section-kicker">Contact</span>
        <h1 className="section-title" id="contact-heading">
          Reach out if you want feedback, support, or a conversation about where
          the platform should go next.
        </h1>
        <p className="section-copy">
          The contact experience now matches the rest of the studio: dark,
          layered, and clear enough to feel premium without becoming noisy.
        </p>
      </section>

      <section className="dashboard-section contact-layout" aria-label="Contact information and form">
        <article className="contact-info-card">
          <span className="section-kicker">Studio desk</span>
          <h2>Let&apos;s talk</h2>
          <p>
            We are a small team that cares about product detail and developer
            careers. If you write in, a human will read it.
          </p>

          <div className="contact-info-list">
            {[
              { icon: <RiMailLine />, label: 'Email', value: 'hello@devsplit.ai' },
              { icon: <RiMapPinLine />, label: 'Location', value: 'Remote - Worldwide' },
              { icon: <RiTimeLine />, label: 'Response time', value: 'Within 24 hours' },
              { icon: <RiPhoneLine />, label: 'Support', value: 'Mon-Fri, 9 AM to 7 PM IST' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="contact-info-item">
                <div className="contact-info-icon" aria-hidden="true">
                  {icon}
                </div>
                <div>
                  <p className="contact-info-label">{label}</p>
                  <p className="contact-info-value">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="contact-form-card">
          <span className="section-kicker">Message the team</span>
          <h2>Send a note</h2>

          <form onSubmit={handleSubmit} noValidate className="contact-form" id="contact-form">
            <div className="contact-field">
              <label className="auth-label" htmlFor="contact-name">
                Full Name
              </label>
              <div className="auth-input-shell">
                <RiUserLine className="auth-input-icon" aria-hidden="true" />
                <input
                  id="contact-name"
                  type="text"
                  className={`auth-input ${errors.name ? 'is-error' : ''}`}
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange('name')}
                  autoComplete="name"
                />
              </div>
              {errors.name && <p className="auth-error">{errors.name}</p>}
            </div>

            <div className="contact-field">
              <label className="auth-label" htmlFor="contact-email">
                Email Address
              </label>
              <div className="auth-input-shell">
                <RiMailLine className="auth-input-icon" aria-hidden="true" />
                <input
                  id="contact-email"
                  type="email"
                  className={`auth-input ${errors.email ? 'is-error' : ''}`}
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange('email')}
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="auth-error">{errors.email}</p>}
            </div>

            <div className="contact-field">
              <label className="auth-label" htmlFor="contact-message">
                Message
              </label>
              <div className="auth-input-shell is-textarea">
                <RiMessage2Line className="auth-input-icon" aria-hidden="true" />
                <textarea
                  id="contact-message"
                  rows={6}
                  className={`auth-input auth-textarea ${
                    errors.message ? 'is-error' : ''
                  }`}
                  placeholder="Tell us what is on your mind..."
                  value={form.message}
                  onChange={handleChange('message')}
                />
              </div>
              {errors.message && <p className="auth-error">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
              id="contact-submit"
            >
              {loading ? 'Sending...' : 'Send message'}
              {!loading && <RiSendPlaneLine aria-hidden="true" />}
            </button>
          </form>
        </article>
      </section>

      <DashboardFooter />
    </div>
  );
};

export default Contact;
