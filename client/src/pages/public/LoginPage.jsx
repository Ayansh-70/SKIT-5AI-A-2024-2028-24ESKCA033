import { GraduationCap, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import LoadingState from '../../components/ui/LoadingState.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { getDashboardPathForRole } from '../../utils/auth.js';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-base px-4">
        <LoadingState
          message="Checking your session..."
          className="mx-auto max-w-md border-border bg-surface"
        />
      </div>
    );
  }

  if (!isLoading && isAuthenticated && user) {
    return <Navigate to={getDashboardPathForRole(user.role)} replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    if (!email.trim() || !password.trim()) {
      setFormError('Email and password are required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const authenticatedUser = await login({
        email: email.trim(),
        password
      });

      const fallbackPath = getDashboardPathForRole(authenticatedUser.role);
      const requestedPath = location.state?.from?.pathname;
      const shouldUseRequestedPath =
        requestedPath && requestedPath !== '/login';

      navigate(shouldUseRequestedPath ? requestedPath : fallbackPath, {
        replace: true
      });
    } catch (error) {
      setFormError(error.userMessage || 'Invalid login credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-layout">
      <aside className="auth-story">
        <Link
          to="/"
          className="relative z-10 flex items-center gap-3 text-sm font-bold"
        >
          <GraduationCap className="h-8 w-8 text-[#dce9be]" strokeWidth={1.5} />{' '}
          AlumniConnect
        </Link>
        <div className="relative z-10 my-16 max-w-lg">
          <p className="mb-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b9cbb1]">
            Different journeys. Shared beginnings.
          </p>
          <h2 className="text-5xl font-medium leading-[1.1] tracking-[-0.04em] xl:text-6xl">
            A familiar place.
            <br />
            <span className="text-[#dce9be]">A new possibility.</span>
          </h2>
          <p className="mt-7 max-w-sm text-sm leading-8 text-[#c5d1c3]">
            Reconnect with your campus community. Find a mentor, share an
            opportunity, or help someone take their next step.
          </p>
          <div className="mt-10 flex gap-3">
            <span className="rounded-full border border-white/20 px-4 py-2 text-xs">
              Students
            </span>
            <span className="rounded-full border border-white/20 px-4 py-2 text-xs">
              Alumni
            </span>
            <span className="rounded-full border border-white/20 px-4 py-2 text-xs">
              Institutes
            </span>
          </div>
        </div>
        <p className="relative z-10 flex items-center gap-2 text-xs text-[#c5d1c3]">
          <ShieldCheck className="h-4 w-4" /> Your institute. Your verified
          community.
        </p>
      </aside>
      <div className="flex items-center justify-center px-6 py-12 sm:px-12">
        <section className="w-full max-w-[400px]">
          <div>
            <Link
              to="/"
              aria-label="AlumniConnect home"
              className="brand-mark mb-8"
            >
              <GraduationCap className="h-6 w-6" />
            </Link>
            <p className="mt-5 text-badge font-bold uppercase tracking-wider text-primary">
              Your community is waiting
            </p>
            <h1 className="mt-3 text-display font-bold tracking-tight text-text-primary">
              Welcome back.
            </h1>
            <p className="mt-3 text-body text-text-secondary">
              Sign in with your institute account to pick up where you left off.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                disabled={isSubmitting}
                onChange={(event) => setEmail(event.target.value)}
                className="field-control"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="mb-0">
                  Password
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-badge font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                  <Link
                    to="/forgot-password"
                    className="text-caption font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                disabled={isSubmitting}
                onChange={(event) => setPassword(event.target.value)}
                className="field-control"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            {formError ? (
              <p className="alert-error mt-4" role="alert" aria-live="polite">
                {formError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary mt-6 w-full py-3.5"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in to your workspace'}{' '}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center gap-4 border-t border-border pt-6">
            <Link
              to="/register-institute"
              className="text-button font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Register your institute
            </Link>
            <Link
              to="/"
              className="text-button font-medium text-text-muted hover:text-text-primary transition-colors"
            >
              Back to home
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;
