import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { BriefcaseIcon, SunIcon, MoonIcon } from '../components/Icons.jsx';

function prettyError(err) {
  const code = err?.code || '';
  const map = {
    'auth/invalid-email': 'That email address looks invalid.',
    'auth/user-not-found': 'No account found with that email.',
    'auth/wrong-password': 'Incorrect password. Try again.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/email-already-in-use': 'An account already exists with that email.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts — please wait and retry.',
    'auth/operation-not-allowed': 'Email/password sign-in is not enabled in Firebase.',
  };
  return map[code] || err?.message || 'Something went wrong. Please try again.';
}

function ThemeButton() {
  const { theme, toggle } = useTheme();
  return (
    <button className="icon-btn auth-theme" onClick={toggle} aria-label="Toggle theme" title="Toggle theme">
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SetupGate() {
  return (
    <div className="auth-page">
      <ThemeButton />
      <div className="login-card">
        <div className="brand">
          <span className="logo">
            <BriefcaseIcon size={20} />
          </span>
          <span className="brand-name">JobTrack</span>
        </div>
        <h1>Connect Firebase</h1>
        <p className="sub">Add your Firebase project to enable sign-in and cloud sync.</p>
        <ol className="setup-steps">
          <li>
            Copy <code>.env.example</code> to <code>.env</code>.
          </li>
          <li>
            Paste your <code>VITE_FIREBASE_*</code> values from the Firebase console.
          </li>
          <li>
            Enable <strong>Email/Password</strong> in Authentication.
          </li>
          <li>
            Create <strong>Cloud Firestore</strong> and publish <code>firestore.rules</code>.
          </li>
          <li>Restart the dev server.</li>
        </ol>
        <p className="setup-foot">Full instructions are in the project README.</p>
      </div>
    </div>
  );
}

export default function Login() {
  const { user, login, signup, isConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!isConfigured) return <SetupGate />;
  if (user) return <Navigate to={from} replace />;

  const isSignup = mode === 'signup';

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (isSignup) await signup(name.trim(), email.trim(), password);
      else await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(prettyError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      <ThemeButton />
      <div className="login-card">
        <div className="brand">
          <span className="logo">
            <BriefcaseIcon size={20} />
          </span>
          <span className="brand-name">JobTrack</span>
        </div>
        <h1>{isSignup ? 'Create your account' : 'Welcome back'}</h1>
        <p className="sub">
          {isSignup ? 'Start tracking your job hunt.' : 'Sign in to track your applications.'}
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={submit}>
          {isSignup && (
            <div className="field">
              <label>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>
          )}
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
            {busy ? 'Please wait…' : isSignup ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <div className="toggle-auth">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => {
              setMode(isSignup ? 'signin' : 'signup');
              setError('');
            }}
          >
            {isSignup ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
}
