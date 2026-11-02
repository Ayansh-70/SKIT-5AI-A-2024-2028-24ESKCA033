import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  GraduationCap,
  Users,
  Sprout,
  CalendarDays,
  Megaphone,
  Briefcase,
  UserRound,
  Bell,
  ShieldCheck
} from 'lucide-react';

function PageHeader({ eyebrow, title, description }) {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const isDashboard = pathname.endsWith('/dashboard');
  const introductions = {
    STUDENT: ['Your next chapter starts here.', 'A conversation today. A possibility tomorrow. Find your people and see where it takes you.'],
    ALUMNI: ['Experience worth passing on.', 'Open a door, share a perspective, and help the next generation find their way.'],
    INSTITUTE_ADMIN: ['A stronger community, together.', 'Bring your people together. Keep your institute connected, supported, and moving forward.'],
    SUPER_ADMIN: ['Good networks start with trust.', 'Welcome new institutes and build a connected community with a strong foundation.']
  };
  const introduction = introductions[user?.role];
  if (isDashboard && introduction) {
    return <section className="collective-welcome">
      <div className="min-w-0">
        <p className="eyebrow mb-5">Your collective / {eyebrow?.replaceAll('_', ' ')}</p>
        <p className="mb-2 text-sm text-text-secondary">Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}.</p>
        <h1 className="max-w-3xl text-[clamp(2.2rem,4.5vw,4.4rem)] font-medium leading-[1.08] tracking-[-0.045em]">{introduction[0]}</h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-text-secondary">{introduction[1]}</p>
      </div>
      <div className="collective-stamp" aria-hidden="true"><span>YOUR INSTITUTE</span><GraduationCap size={36} strokeWidth={1} /><span>A SHARED FUTURE</span></div>
    </section>;
  }
  const interior =
    !pathname.endsWith('/dashboard') &&
    !['/register-institute', '/'].includes(pathname);
  const Icon = /opportunit/.test(pathname)
    ? Briefcase
    : /events/.test(pathname)
      ? CalendarDays
      : /announcements/.test(pathname)
        ? Megaphone
        : /profile/.test(pathname)
          ? UserRound
          : /guidance/.test(pathname)
            ? Sprout
            : /notifications/.test(pathname)
              ? Bell
              : /verification|requests/.test(pathname)
                ? ShieldCheck
                : Users;
  return (
    <section
      className={
        interior ? 'interior-hero' : 'mb-8 border-b border-border pb-7'
      }
    >
      <div className="relative z-10 min-w-0">
        {eyebrow ? (
          <p className="eyebrow mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow.replaceAll('_', ' ')}
          </p>
        ) : null}
        <h1 className="page-heading">{title}</h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
            {description}
          </p>
        ) : null}
      </div>
      {interior && (
        <div className="interior-icon" aria-hidden="true">
          <Icon className="h-6 w-6" strokeWidth={1} />
        </div>
      )}
    </section>
  );
}
export default PageHeader;
