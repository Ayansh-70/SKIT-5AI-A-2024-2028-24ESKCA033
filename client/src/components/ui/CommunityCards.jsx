import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  MapPin,
  GraduationCap,
  Sprout,
  Briefcase,
  Clock,
  Megaphone,
  CalendarDays
} from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';

export function MemberAvatar({ name = '', large = false }) {
  const initials =
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'AC';
  return (
    <span
      aria-hidden="true"
      className={`member-avatar ${large ? 'member-avatar-large' : ''}`}
    >
      {initials}
    </span>
  );
}

export function MemberCard({ alumni }) {
  return (
    <article className="member-card">
      <div className="p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <MemberAvatar name={alumni.user?.name} large />
          <StatusBadge value={alumni.verificationStatus} />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">
          {alumni.user?.name}
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          {alumni.currentRole || 'Alumni'}
          {alumni.currentCompany ? ` at ${alumni.currentCompany}` : ''}
        </p>
        <div className="my-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-text-secondary">
          <span className="flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5" /> Class of{' '}
            {alumni.batch || 'Not provided'}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {alumni.location || 'Location not provided'}
          </span>
        </div>
        <p className="mb-4 text-xs text-text-secondary">
          {alumni.branch}
          {alumni.domain ? ` / ${alumni.domain}` : ''}
        </p>
        <div className="flex flex-wrap gap-2">
          {(alumni.skills || []).slice(0, 3).map((skill) => (
            <span className="skill-tag" key={skill}>
              {skill}
            </span>
          ))}
          {alumni.skills?.length > 3 && (
            <span className="skill-tag">+{alumni.skills.length - 3} more</span>
          )}
        </div>
        {(alumni.canMentor || alumni.canProvideReferral) && (
          <div className="mt-5 flex flex-wrap gap-3 text-[11px] font-semibold text-primary">
            {alumni.canMentor && (
              <span className="flex items-center gap-1.5">
                <Sprout className="h-4 w-4" />
                Open to mentoring
              </span>
            )}
            {alumni.canProvideReferral && (
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5" />
                Referral support
              </span>
            )}
          </div>
        )}
        <Link
          to={`/student/alumni/${alumni._id}`}
          className="mt-6 flex min-h-11 items-center justify-between border-t border-border pt-4 text-sm font-semibold text-primary hover:text-primary-hover"
        >
          Meet {alumni.user?.name?.split(' ')[0] || 'this alumni'}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export function EventCard({ event }) {
  const date = event.date ? new Date(event.date) : null;
  const valid = date && !Number.isNaN(date.getTime());
  return (
    <article className="event-ticket">
      <div className="event-date">
        <CalendarDays className="mb-4 h-5 w-5" strokeWidth={1.4} />
        <span className="text-xs font-bold uppercase tracking-[0.2em]">
          {valid
            ? date.toLocaleDateString(undefined, { month: 'short' })
            : 'Date'}
        </span>
        <span className="my-1 font-display text-5xl font-medium">
          {valid ? date.getDate() : '--'}
        </span>
        <span className="text-xs">
          {valid ? date.getFullYear() : 'To be confirmed'}
        </span>
      </div>
      <div className="min-w-0 flex-1 p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="skill-tag">
            {event.eventType?.replaceAll('_', ' ')}
          </span>
          <span className="skill-tag">{event.mode}</span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">{event.title}</h2>
        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-text-secondary">
          {event.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-4 border-t border-border pt-5 text-xs text-text-secondary">
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {event.startTime} - {event.endTime}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {event.location || 'Location to be confirmed'}
          </span>
        </div>
        {event.mode !== 'OFFLINE' && (
          <p className="mt-4 break-all text-xs text-text-secondary">
            Meeting link: {event.meetingLink || 'Not provided'}
          </p>
        )}
      </div>
    </article>
  );
}

export function BulletinCard({ announcement }) {
  return (
    <article className="bulletin-card">
      <div className="flex flex-wrap items-center gap-3 border-b border-border pb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Megaphone className="h-4 w-4" />
        </span>
        <span className="eyebrow">
          {announcement.category?.replaceAll('_', ' ') || 'Campus update'}
        </span>
        <span className="ml-auto text-xs text-text-muted">
          {new Date(announcement.createdAt).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </span>
      </div>
      <h2 className="mb-4 mt-6 text-2xl font-medium tracking-tight">
        {announcement.title}
      </h2>
      <p className="whitespace-pre-line text-sm leading-8 text-text-secondary">
        {announcement.message}
      </p>
      <p className="mt-8 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
        <GraduationCap className="h-4 w-4" />
        From your institute
      </p>
    </article>
  );
}

export function ProfileIdentity({ user, formData }) {
  const skills = Array.isArray(formData.skills)
    ? formData.skills
    : (formData.skills || '')
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean);
  return (
    <aside className="profile-identity">
      <div className="member-cover">
        <GraduationCap className="h-10 w-10" strokeWidth={0.8} />
        <span>YOUR CAMPUS IDENTITY</span>
      </div>
      <div className="px-6 pb-7">
        <div className="relative -mt-7">
          <MemberAvatar name={user?.name} large />
        </div>
        <p className="eyebrow mt-6">Profile preview</p>
        <h2 className="mt-2 text-2xl font-semibold">{user?.name}</h2>
        <p className="mt-2 text-sm text-text-secondary">
          {formData.currentRole ||
            formData.branch ||
            'Your journey starts here'}
        </p>
        {formData.currentCompany && (
          <p className="mt-1 text-sm text-primary">{formData.currentCompany}</p>
        )}
        <div className="my-6 space-y-3 border-y border-border py-5 text-xs text-text-secondary">
          <p className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            {formData.batch
              ? `Class of ${formData.batch}`
              : 'Add your graduating year'}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {formData.location || 'Add your location'}
          </p>
        </div>
        <p className="text-sm leading-7 text-text-secondary">
          {formData.bio ||
            'A short introduction helps your community get to know the person behind the profile.'}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span className="skill-tag" key={skill}>
              {skill}
            </span>
          ))}
        </div>
        <p className="mt-7 border-t border-border pt-5 text-xs leading-6 text-text-muted">
          This preview reflects your edits. Save your profile to update your
          information.
        </p>
      </div>
    </aside>
  );
}
