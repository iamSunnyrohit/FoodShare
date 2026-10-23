
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthLayout from '../components/AuthLayout.jsx';
import GoogleButton from '../components/GoogleButton.jsx';
import RolePicker from '../components/RolePicker.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { errorMessage } from '../api/client.js';

export default function Register() {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: 'donor',
    name: '',
    organization: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const onGoogleError = useCallback((message) => {
    setError(message);
  }, []);

  // Register using email and password
  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!form.email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);

    try {
      await register({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        organization: form.organization.trim(),
      });

      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  // Register or sign in using Google
  const onGoogle = async (credential) => {
    setError('');
    setSubmitting(true);

    try {
      await loginWithGoogle(credential, form.role);

      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="auth-title">Create your account</h1>

      <p className="auth-subtitle">
        Join FoodShare and help connect surplus food with your community.
      </p>

      {error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}

      {/* Choose account role */}
      <RolePicker
        value={form.role}
        onChange={(role) =>
          setForm((previous) => ({
            ...previous,
            role,
          }))
        }
      />

      {/* Google sign-up */}
      <GoogleButton
        text="signup_with"
        onCredential={onGoogle}
        onError={onGoogleError}
      />

      <div className="divider">
        <span>or sign up with email</span>
      </div>

      {/* Email registration form */}
      <form onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="register-name">Full name</label>

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

        <div className="field">
          <label htmlFor="register-organization">
            Organisation (optional)
          </label>

          <input
            id="register-organization"
            name="organization"
            type="text"
            autoComplete="organization"
            placeholder="Restaurant, NGO or shelter name"
            value={form.organization}
            onChange={onChange}
          />
        </div>

        <div className="field">
          <label htmlFor="register-email">Email address</label>

          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={onChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="register-password">Password</label>

          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Create a password"
            minLength={6}
            value={form.password}
            onChange={onChange}
            required
          />

          <p className="hint">At least 6 characters.</p>
        </div>

        <button
          className="btn block"
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="switch">
        Already registered? <Link to="/login">Log in</Link>
      </p>
    </AuthLayout>
  );
}
