
import { useCallback, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleButton from '../components/GoogleButton.jsx';
import RolePicker from '../components/RolePicker.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { errorMessage } from '../api/client.js';
import Footer from './Footer.jsx';
import './Login.css';

const roles = [
  {
    id: 'donor',
    icon: '▤',
    title: 'Food Donor',
    description: 'Restaurants, bakeries, grocers, caterers & farms',
    features: [
      'Post surplus food for scheduled pickups',
      'Organize food donations',
      'Reduce food waste in your community',
    ],
  },
  {
    id: 'receiver',
    icon: '♧',
    title: 'Receiver & Shelter',
    description: 'Community pantries, shelters & households',
    features: [
      'Find available rescued food',
      'Discover nearby food donations',
      'Access food at no cost',
    ],
  },
  {
    id: 'volunteer',
    icon: '♧',
    title: 'Volunteer Courier',
    description: 'People helping deliver food locally',
    features: [
      'Deliver rescued food',
      'Coordinate pickups',
      'Support your neighborhood',
    ],
  },
];

export default function Login() {
  const { login, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || '/dashboard';
  const initialMode =
    new URLSearchParams(location.search).get('mode') === 'register'
      ? 'register'
      : 'login';

  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState('receiver');

  const [form, setForm] = useState({
    name: '',
    organization: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [pending, setPending] = useState(null);

  const isRegister = mode === 'register';

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError('');
    setPending(null);

    navigate(
      nextMode === 'register' ? '/login?mode=register' : '/login',
      { replace: true, state: location.state }
    );
  };

  const onGoogleError = useCallback((message) => {
    setError(message);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!form.password) {
      setError('Please enter your password.');
      return;
    }

    if (isRegister && !form.name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (isRegister && form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);

    try {
      if (isRegister) {
        await register({
          name: form.name.trim(),
          organization: form.organization.trim(),
          email: form.email.trim(),
          password: form.password,
          role,
        });
      } else {
        await login(form.email.trim(), form.password);
      }

      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const finishGoogle = async (credential, selectedRole) => {
    setError('');
    setSubmitting(true);

    try {
      const result = await loginWithGoogle(credential, selectedRole);

      if (result?.needsRole) {
        setPending({
          credential,
          profile: result.profile,
        });
      } else {
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (pending) {
    return (
      <main className="login-page">
        <section className="login-pending">
          <div className="login-brand">
            <img src="/icon.png" alt="FoodShare logo" />
            <span>FoodShare</span>
          </div>

          <div className="login-panel">
            <span className="login-eyebrow">COMMUNITY ONBOARDING</span>
            <h1>Almost there!</h1>

            <p>
              {pending.profile?.email || 'Your Google account'} is not
              registered yet. Choose your role to continue.
            </p>

            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            <RolePicker value={role} onChange={setRole} />

            <button
              className="login-primary-button"
              type="button"
              disabled={submitting}
              onClick={() =>
                finishGoogle(pending.credential, role)
              }
            >
              {submitting ? 'Please wait…' : 'Continue'}
              <span>→</span>
            </button>

            <button
              className="login-text-button"
              type="button"
              onClick={() => setPending(null)}
            >
              Use a different account
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="login-page">
      <div className="login-shell">
        <section className="login-intro">
          <div className="login-breadcrumb">
            <span>COMMUNITY ACCESS</span>
            <span className="login-breadcrumb-dot">•</span>
            <span>Welcome to FoodShare</span>
          </div>

          <div className="login-intro-content">
            <div>
              <h1>
                Good food brings
                <br />
                <span>neighbors together.</span>
              </h1>

              <p>
                {isRegister
                  ? 'Create your account to rescue surplus food, discover fresh meals, and help your neighborhood.'
                  : 'Sign in to rescue surplus food, discover fresh meals, or deliver nourishment to your neighborhood.'}
              </p>
            </div>

            <div className="login-community-badge">
              <div className="login-avatar-stack">
                <span>🌿</span>
                <span>🥕</span>
                <span>🥬</span>
              </div>
              <div>
                <strong>FoodShare Community</strong>
                <span>Making a difference together</span>
              </div>
            </div>
          </div>
        </section>

        <section className="login-role-section">
          <div className="login-section-heading">
            <h2>
              <span className="login-step-number">1</span>
              Choose your community role
            </h2>
            <p>Select how you want to participate.</p>
          </div>

          <div className="login-role-grid">
            {roles.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`login-role-card ${
                  role === item.id ? 'selected' : ''
                }`}
                onClick={() => setRole(item.id)}
                aria-pressed={role === item.id}
              >
                <div className="login-role-top">
                  <span className={`login-role-icon ${item.id}`}>
                    {item.icon}
                  </span>
                  <span className="login-role-check">
                    {role === item.id ? '✓' : ''}
                  </span>
                </div>

                <h3>{item.title}</h3>
                <p className="login-role-description">
                  {item.description}
                </p>

                <ul>
                  {item.features.map((feature) => (
                    <li key={feature}>
                      <span className="login-feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="login-role-footer">
                  <span>
                    {item.id === 'donor'
                      ? 'Food recovery'
                      : item.id === 'receiver'
                        ? 'Food access'
                        : 'Community impact'}
                  </span>
                  <strong>
                    {role === item.id ? 'Selected' : 'Choose role'}
                  </strong>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="login-content-grid">
          <section className="login-panel">
            <div className="login-panel-heading">
              <div>
                <h2>
                  <span className="login-step-number">2</span>
                  {isRegister ? 'Create your account' : 'Account credentials'}
                </h2>

                <p>
                  {isRegister ? 'Join FoodShare as a ' : 'Continue as a '}
                  <strong>
                    {roles.find((item) => item.id === role)?.title}
                  </strong>.
                </p>
              </div>

              <div className="login-auth-switch">
                <button
                  type="button"
                  className={!isRegister ? 'active' : ''}
                  onClick={() => switchMode('login')}
                >
                  Log in
                </button>

                <button
                  type="button"
                  className={isRegister ? 'active' : ''}
                  onClick={() => switchMode('register')}
                >
                  Sign up
                </button>
              </div>
            </div>

            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            <div className="login-google-button">
              <GoogleButton
                text={isRegister ? 'signup_with' : 'signin_with'}
                onCredential={(credential) =>
                  finishGoogle(credential, role)
                }
                onError={onGoogleError}
              />
            </div>

            <div className="login-divider">
              <span>
                or {isRegister ? 'sign up' : 'log in'} with email
              </span>
            </div>

            <form
              className="login-form"
              onSubmit={onSubmit}
              noValidate
            >
              <div className="login-fields-grid">
                {isRegister && (
                  <>
                    <div className="login-field full-width">
                      <label htmlFor="register-name">
                        Full name <span>*</span>
                      </label>

                      <div className="login-input-wrap">
                        <input
                          id="register-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Enter your full name"
                          value={form.name}
                          onChange={onChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="login-field full-width">
                      <label htmlFor="register-organization">
                        Organisation (optional)
                      </label>

                      <div className="login-input-wrap">
                        <input
                          id="register-organization"
                          name="organization"
                          type="text"
                          autoComplete="organization"
                          placeholder="Restaurant, NGO or shelter"
                          value={form.organization}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="login-field full-width">
                  <label htmlFor="login-email">
                    Email address <span>*</span>
                  </label>

                  <div className="login-input-wrap">
                    <input
                      id="login-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={onChange}
                      required
                    />
                    <span className="login-input-icon">✉</span>
                  </div>
                </div>

                <div className="login-field full-width">
                  <label htmlFor="login-password">
                    Password <span>*</span>
                  </label>

                  <div className="login-input-wrap">
                    <input
                      id="login-password"
                      name="password"
                      type="password"
                      autoComplete={
                        isRegister ? 'new-password' : 'current-password'
                      }
                      placeholder={
                        isRegister
                          ? 'Create a password'
                          : 'Enter your password'
                      }
                      minLength={isRegister ? 6 : undefined}
                      value={form.password}
                      onChange={onChange}
                      required
                    />
                    <span className="login-input-icon">♙</span>
                  </div>

                  {isRegister && (
                    <p className="hint">At least 6 characters.</p>
                  )}
                </div>
              </div>

              {!isRegister && (
                <div className="login-form-options">
                  <label className="login-remember">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>

                  <span className="login-reset-note">
                    Forgot your password? Contact support.
                  </span>
                </div>
              )}

              <button
                className="login-primary-button"
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? isRegister
                    ? 'Creating account…'
                    : 'Logging in…'
                  : isRegister
                    ? 'Create FoodShare account'
                    : 'Log in to FoodShare'}
                <span>→</span>
              </button>

              <div className="login-privacy-note">
                <span>♙</span>
                Your connection is secure and private.
              </div>
            </form>

            <p className="login-register-prompt">
              {isRegister ? 'Already have an account? ' : 'New to FoodShare? '}
              <button
                type="button"
                onClick={() =>
                  switchMode(isRegister ? 'login' : 'register')
                }
              >
                {isRegister ? 'Log in' : 'Create a free account'}
              </button>
            </p>
          </section>

          <aside className="login-sidebar">
            <section className="login-quote-card">
              <div className="login-quote-person">
                <div className="login-person-avatar">FS</div>
                <div>
                  <strong>FoodShare Community</strong>
                  <span>Neighbors helping neighbors</span>
                </div>
              </div>

              <blockquote>
                “Every meal shared is an opportunity to reduce waste
                and help someone in our community.”
              </blockquote>

              <div className="login-impact-stats">
                <span>♧ Food recovery</span>
                <span>★ Community impact</span>
              </div>
            </section>

            <section className="login-info-card">
              <div className="login-info-heading">
                <h3>How FoodShare works</h3>
                <span className="login-live-dot" />
              </div>

              <div className="login-progress-row">
                <div className="login-progress-circle">
                  <strong>3</strong>
                </div>
                <div>
                  <strong>Simple steps</strong>
                  <p>Join, connect, and share food locally.</p>
                </div>
              </div>

              <p className="login-info-description">
                Connect surplus groceries and prepared meals with
                people who can use them.
              </p>
            </section>

            <section className="login-info-card login-trust-card">
              <h3>Our community values</h3>

              <div className="login-trust-item">
                <span>✓</span>
                <div>
                  <strong>Reduce food waste</strong>
                  <p>Help good food reach people instead of landfills.</p>
                </div>
              </div>

              <div className="login-trust-item">
                <span>✚</span>
                <div>
                  <strong>Share responsibly</strong>
                  <p>Coordinate food details and pickup information.</p>
                </div>
              </div>

              <div className="login-trust-item">
                <span>♡</span>
                <div>
                  <strong>Build stronger neighborhoods</strong>
                  <p>Make local food sharing easier for everyone.</p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>

      <Footer />
      
    </main>
  );
}
