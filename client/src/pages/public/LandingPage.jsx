import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  Users,
  Briefcase,
  Sprout,
  Network
} from 'lucide-react';

function LandingPage() {
  return (
    <div>
      <section className="grid items-center gap-12 pb-16 pt-4 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-24 lg:pt-10">
        <div>
          <p className="eyebrow mb-7 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" /> Rooted in
            campus. Built for what&rsquo;s next.
          </p>
          <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[1.04] tracking-[-0.055em]">
            Your next chapter.
            <br />
            <span className="text-primary">Our shared roots.</span>
          </h1>
          <p className="mt-7 max-w-lg text-base leading-8 text-text-secondary">
            The campus connection doesn&rsquo;t end at graduation. Find people who&rsquo;ve
            walked your path and open doors for those following yours.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/login" className="btn-primary px-6">
              Find your community <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/register-institute" className="btn-secondary px-6">
              Bring your institute
            </Link>
          </div>
          <p className="mt-7 flex items-center gap-2 text-xs text-text-secondary">
            <ShieldCheck className="h-4 w-4 text-primary" /> Institute-verified
            people. Meaningful connections.
          </p>
        </div>
        <div
          className="network-art mx-auto h-[420px] w-full max-w-[480px] sm:h-[480px]"
          aria-label="Students, alumni and opportunities connected through their institute"
        >
          <p className="absolute left-16 right-16 top-12 text-center text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-[#526648]">
            One campus. A world of possibility.
          </p>
          <div className="absolute left-1/2 top-[45%] z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#244b37] text-[#edf0db]">
            <Network className="mb-2 h-9 w-9" strokeWidth={1.2} />
            <span className="text-[10px] font-semibold">Your institute</span>
          </div>
          <div className="network-node left-[5%] top-[24%]">
            <GraduationCap className="h-7 w-7 text-[#a85235]" />
            <div>
              <p className="text-sm font-bold">A fresh perspective</p>
              <p className="mt-1 text-[11px] text-[#64725c]">
                Students ready to grow
              </p>
            </div>
          </div>
          <div className="network-node right-[3%] top-[59%]">
            <Users className="h-7 w-7 text-[#477051]" />
            <div>
              <p className="text-sm font-bold">A familiar beginning</p>
              <p className="mt-1 text-[11px] text-[#64725c]">
                Alumni giving back
              </p>
            </div>
          </div>
          <div className="absolute bottom-8 left-7 right-7 z-10 flex items-center justify-between border-t border-[#adbd99] pt-5 text-[#405738]">
            <span className="text-xs">Guidance. Connection. Opportunity.</span>
            <Sprout className="h-6 w-6" />
          </div>
        </div>
      </section>
      <section className="grid gap-6 border-y border-border py-7 sm:grid-cols-3">
        {[
          'Verified by your institute',
          'Connected through experience',
          'Built around your community'
        ].map((text, index) => (
          <div key={text} className="flex items-center gap-4">
            <span className="font-display text-sm text-accent">
              0{index + 1}
            </span>
            <p className="text-sm font-medium">{text}</p>
          </div>
        ))}
      </section>
      <section className="py-16 sm:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-4">Good things start with a connection</p>
            <h2 className="page-heading">A network with a purpose.</h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-text-secondary">
            From your first question to your next big move, your community is
            here.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              Icon: Users,
              title: 'Find your people',
              description:
                'Discover verified alumni by their skills, company, and experience. Start a conversation with someone who understands your journey.',
              label: 'Explore your network'
            },
            {
              Icon: Sprout,
              title: 'Grow with guidance',
              description:
                'Ask for career advice, project guidance, or a referral. Turn shared experience into a clearer path forward.',
              label: 'Make a connection'
            },
            {
              Icon: Briefcase,
              title: 'Open the next door',
              description:
                'Explore institute-approved opportunities, join campus events, and stay close to the community that shaped you.',
              label: 'Discover possibilities'
            }
          ].map(({ Icon, title, description, label }, index) => (
            <Link
              to="/login"
              key={title}
              className="group content-card flex flex-col !p-7"
            >
              <div className="mb-10 flex items-center justify-between">
                <Icon className="h-7 w-7 text-primary" strokeWidth={1.4} />
                <span className="eyebrow">0{index + 1}</span>
              </div>
              <h3 className="text-2xl font-medium tracking-tight">{title}</h3>
              <p className="mb-8 mt-3 flex-1 text-sm leading-7 text-text-secondary">
                {description}
              </p>
              <span className="flex items-center justify-between border-t border-border pt-5 text-xs font-semibold">
                {label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="flex flex-col justify-between gap-8 rounded-2xl bg-sidebar p-8 text-[#f2f4e8] sm:p-12 md:flex-row md:items-center">
        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#bdcbb3]">
            For institutes
          </p>
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Keep your community growing.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-[#bdcbb3]">
            Bring students and alumni together in one verified institute
            network.
          </p>
        </div>
        <Link
          to="/register-institute"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-lg bg-[#dce9be] px-6 text-sm font-semibold text-[#203c2b] hover:bg-[#edf3db]"
        >
          Register your institute <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
      <footer className="mt-14 flex flex-wrap justify-between gap-4 border-t border-border py-7 text-xs text-text-secondary">
        <span>AlumniConnect / The institute network</span>
        <span>Shared roots. New possibilities.</span>
      </footer>
    </div>
  );
}
export default LandingPage;
