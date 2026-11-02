import { Link } from 'react-router-dom';
import {
  Users,
  Network,
  Briefcase,
  Calendar,
  Shield,
  User,
  Compass,
  ArrowUpRight
} from 'lucide-react';

function getIcon(action) {
  const title = action.title.toLowerCase();
  if (/profile/.test(title)) return User;
  if (/opportunit/.test(title)) return Briefcase;
  if (/event|announcement/.test(title)) return Calendar;
  if (/verification|approval|institute/.test(title)) return Shield;
  if (/guidance/.test(title)) return Compass;
  if (/connection|search/.test(title)) return Network;
  return Users;
}
function DashboardActionGrid({ actions }) {
  const featured =
    actions.find((action) =>
      /Search|Verification|Connection|Institute Requests/.test(action.title)
    ) || actions[0];
  if (!featured) return null;
  const FeaturedIcon = getIcon(featured);
  const groups = actions.filter((action) => action.to !== featured.to).reduce((result, action) => {
    (result[action.eyebrow] ||= []).push(action);
    return result;
  }, {});
  return (
    <section aria-label="Workspace actions" className={`dashboard-editorial ${actions.length === 1 ? 'dashboard-editorial-single' : ''}`}>
      <Link to={featured.to} className="collective-feature group">
        <div className="flex items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.2em]"><span>The next chapter</span><ArrowUpRight size={20} /></div>
        <div className="collective-orbit" aria-hidden="true">
          <span className="orbit-ring orbit-ring-one" /><span className="orbit-ring orbit-ring-two" />
          <span className="orbit-core"><FeaturedIcon size={42} strokeWidth={1.2} /></span>
          <span className="orbit-label orbit-label-one">Connect</span><span className="orbit-label orbit-label-two">Grow together</span>
          <span className="orbit-dot" />
        </div>
        <div className="relative">
          <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#c5d0fa]">{featured.eyebrow} / Featured</p>
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">{featured.title}</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#d5def9]">{featured.description}</p>
          <span className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#e8edb6] px-5 py-3 text-xs font-semibold text-[#242d39]">Explore now<ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
        </div>
      </Link>
      {actions.length > 1 && <div className="min-w-0">
        <div className="mb-3 flex items-baseline justify-between gap-3 border-b border-border pb-5"><h2 className="text-xl font-medium tracking-tight">Make your next move</h2><span className="eyebrow">Explore</span></div>
        {Object.entries(groups).map(([label, items]) => <div key={label} className="action-chapter">
          <p className="eyebrow py-4">{label}</p>
          {items.map((action) => { const Icon = getIcon(action); return <Link key={action.to} to={action.to} className="collective-action group">
            <span className="action-symbol"><Icon size={21} strokeWidth={1.5} /></span>
            <div className="min-w-0 flex-1"><h3 className="text-sm font-semibold sm:text-base">{action.title}</h3><p className="mt-1 text-xs leading-6 text-text-secondary">{action.description}</p></div>
            <ArrowUpRight size={18} className="shrink-0 text-text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
          </Link>; })}
        </div>)}
      </div>}
    </section>
  );
}
export default DashboardActionGrid;
