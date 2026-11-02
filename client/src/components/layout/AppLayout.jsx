import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { getDashboardPathForRole } from '../../utils/auth.js';
import {
  LayoutDashboard,
  Shield,
  Users,
  Building,
  PlusCircle,
  CheckCircle,
  Briefcase,
  Megaphone,
  Calendar,
  User,
  Search,
  Link2,
  Compass,
  Bell,
  X,
  Menu,
  ChevronDown,
  Sun,
  Moon,
  GraduationCap
} from 'lucide-react';

const NAVIGATION_BY_ROLE = {
  SUPER_ADMIN: [
    {
      label: 'Overview',
      items: [
        {
          label: 'Dashboard',
          to: '/super-admin/dashboard',
          icon: LayoutDashboard
        }
      ]
    },
    {
      label: 'Platform',
      items: [
        {
          label: 'Institute Requests',
          to: '/super-admin/institute-requests',
          icon: Shield
        }
      ]
    }
  ],
  INSTITUTE_ADMIN: [
    {
      label: 'Overview',
      items: [
        {
          label: 'Dashboard',
          to: '/institute-admin/dashboard',
          icon: LayoutDashboard
        }
      ]
    },
    {
      label: 'People',
      items: [
        { label: 'Students', to: '/institute-admin/students', icon: Users },
        { label: 'Alumni', to: '/institute-admin/alumni', icon: Building },
        {
          label: 'Create Student',
          to: '/institute-admin/students/create',
          icon: PlusCircle
        },
        {
          label: 'Create Alumni',
          to: '/institute-admin/alumni/create',
          icon: PlusCircle
        }
      ]
    },
    {
      label: 'Approvals',
      items: [
        {
          label: 'Alumni Verification',
          to: '/institute-admin/alumni-verification',
          icon: CheckCircle
        },
        {
          label: 'Opportunities',
          to: '/institute-admin/opportunities',
          icon: Briefcase
        }
      ]
    },
    {
      label: 'Broadcasts',
      items: [
        {
          label: 'Announcements',
          to: '/institute-admin/announcements',
          icon: Megaphone
        },
        { label: 'Events', to: '/institute-admin/events', icon: Calendar }
      ]
    }
  ],
  STUDENT: [
    {
      label: 'Overview',
      items: [
        { label: 'Dashboard', to: '/student/dashboard', icon: LayoutDashboard },
        { label: 'My Profile', to: '/student/profile', icon: User }
      ]
    },
    {
      label: 'Network',
      items: [
        { label: 'Search Alumni', to: '/student/alumni-search', icon: Search },
        { label: 'Connections', to: '/student/connections', icon: Link2 },
        {
          label: 'Guidance Requests',
          to: '/student/guidance-requests',
          icon: Compass
        }
      ]
    },
    {
      label: 'Campus',
      items: [
        {
          label: 'Opportunities',
          to: '/student/opportunities',
          icon: Briefcase
        },
        {
          label: 'Announcements',
          to: '/student/announcements',
          icon: Megaphone
        },
        { label: 'Events', to: '/student/events', icon: Calendar }
      ]
    }
  ],
  ALUMNI: [
    {
      label: 'Overview',
      items: [
        { label: 'Dashboard', to: '/alumni/dashboard', icon: LayoutDashboard },
        { label: 'My Profile', to: '/alumni/profile', icon: User }
      ]
    },
    {
      label: 'Requests',
      items: [
        {
          label: 'Connections',
          to: '/alumni/connection-requests',
          icon: Link2
        },
        {
          label: 'Guidance Requests',
          to: '/alumni/guidance-requests',
          icon: Compass
        }
      ]
    },
    {
      label: 'Sharing',
      items: [
        {
          label: 'My Opportunities',
          to: '/alumni/opportunities',
          icon: Briefcase
        },
        {
          label: 'Post Opportunity',
          to: '/alumni/opportunities/create',
          icon: PlusCircle
        }
      ]
    },
    {
      label: 'Campus',
      items: [
        {
          label: 'Announcements',
          to: '/alumni/announcements',
          icon: Megaphone
        },
        { label: 'Events', to: '/alumni/events', icon: Calendar }
      ]
    }
  ]
};

const DETAIL_ROUTE_META = [
  {
    match: (pathname) => /^\/student\/alumni\/[^/]+$/.test(pathname),
    title: 'Alumni Details',
    description: 'Review verified alumni information and outreach options.'
  },
  {
    match: (pathname) => /^\/student\/opportunities\/[^/]+$/.test(pathname),
    title: 'Opportunity Details',
    description: 'Review the full scope, deadline, and application path.'
  },
  {
    match: (pathname) => pathname === '/notifications',
    title: 'Notifications',
    description: 'Track automated updates across the platform.'
  }
];

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, unreadNotificationCount, user, logout } = useAuth();
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    const closeMenus = (event) => {
      if (!accountRef.current?.contains(event.target)) setIsProfileOpen(false);
      document.querySelectorAll('.workspace-nav-group[open]').forEach((menu) => {
        if (!menu.contains(event.target)) menu.removeAttribute('open');
      });
    };
    document.addEventListener('pointerdown', closeMenus);
    return () => document.removeEventListener('pointerdown', closeMenus);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    setIsMobileNavOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const navigationGroups = useMemo(
    () => (user ? NAVIGATION_BY_ROLE[user.role] || [] : []),
    [user]
  );
  const flatNavigation = useMemo(
    () =>
      navigationGroups.flatMap((group) =>
        group.items.map((item) => ({ ...item, groupLabel: group.label }))
      ),
    [navigationGroups]
  );

  const currentPage = useMemo(() => {
    const exactMatch = flatNavigation.find(
      (item) => item.to === location.pathname
    );

    if (exactMatch) {
      return {
        title: exactMatch.label,
        description: exactMatch.groupLabel
      };
    }

    const detailMatch = DETAIL_ROUTE_META.find((item) =>
      item.match(location.pathname)
    );
    return (
      detailMatch || { title: 'Workspace', description: 'Institute network' }
    );
  }, [flatNavigation, location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  if (!isAuthenticated || !user) {
    const isLoginPage = location.pathname === '/login';

    return (
      <div className="min-h-screen bg-bg-base text-text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-surface focus:p-3"
        >
          Skip to content
        </a>
        {isLoginPage ? null : (
          <header className="sticky top-0 z-40 border-b border-border bg-bg-base/95 backdrop-blur-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-10">
              <Link to="/" className="flex items-center gap-2 sm:gap-3">
                <LogoMark />
                <div>
                  <p className="whitespace-nowrap text-[13px] sm:text-body font-bold tracking-tight text-text-primary">
                    AlumniConnect
                  </p>
                  <p className="text-[10px] sm:text-caption text-text-secondary">
                    The institute network
                  </p>
                </div>
              </Link>

              <div className="flex items-center gap-2">
                <Link
                  to="/"
                  className="btn-secondary hidden border-transparent bg-transparent hover:bg-bg-secondary px-3 py-2 sm:inline-flex"
                >
                  Home
                </Link>
                <Link
                  to="/register-institute"
                  className="hidden btn-secondary border-transparent bg-transparent hover:bg-bg-secondary px-3 py-2 sm:inline-flex"
                >
                  Register
                </Link>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="btn-secondary h-9 w-9 p-0 border-transparent bg-transparent hover:bg-bg-secondary"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </button>
                <Link
                  to="/login"
                  className="btn-primary ml-2 whitespace-nowrap"
                >
                  Sign In
                </Link>
              </div>
            </nav>
          </header>
        )}

        <main
          id="main-content"
          className={isLoginPage ? '' : 'mx-auto max-w-7xl px-4 py-10 lg:px-10'}
        >
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="collective-workspace min-h-screen bg-bg-base text-text-primary" onKeyDown={(event) => {
      if (event.key === 'Escape') {
        setIsMobileNavOpen(false);
        setIsProfileOpen(false);
        event.currentTarget.querySelectorAll('details[open]').forEach((item) => item.removeAttribute('open'));
      }
    }}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-surface focus:p-3">Skip to content</a>
      <header className="collective-header">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-4 sm:px-8 lg:px-12">
          <Link to={getDashboardPathForRole(user.role)} className="flex items-center gap-3">
            <LogoMark />
            <div>
              <p className="text-sm font-bold tracking-tight sm:text-base">AlumniConnect<span className="text-accent">.</span></p>
              <p className="hidden text-[9px] uppercase tracking-[0.22em] text-text-secondary sm:block">People. Possibility. Progress.</p>
            </div>
          </Link>
          <p className="hidden max-w-64 truncate text-xs text-text-secondary xl:block">{user.institute?.name || 'The institute network'}</p>
          <div className="flex items-center gap-1 sm:gap-3">
            <button type="button" onClick={toggleTheme} className="workspace-icon-button" aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <Link to="/notifications" className="workspace-icon-button relative" aria-label={`Notifications${unreadNotificationCount ? `, ${unreadNotificationCount} unread` : ''}`}>
              <Bell size={18} />
              {unreadNotificationCount > 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent ring-2 ring-surface" />}
            </Link>
            <div className="relative" ref={accountRef}>
              <button type="button" onClick={() => setIsProfileOpen((current) => !current)} className="flex min-h-11 items-center gap-2 rounded-full p-1 sm:pr-3" aria-expanded={isProfileOpen} aria-controls="account-menu" aria-label="Account menu">
                <Avatar name={user.name} />
                <span className="hidden max-w-28 truncate text-xs font-semibold sm:inline">{user.name}</span><ChevronDown size={14} />
              </button>
              {isProfileOpen && <div id="account-menu" className="absolute right-0 top-full z-50 w-64 rounded-2xl border border-border bg-surface p-3 shadow-level-2">
                <p className="break-words px-3 pt-2 text-sm font-semibold">{user.name}</p>
                <p className="px-3 py-2 text-[10px] tracking-wider text-text-secondary">{user.role.replaceAll('_', ' ')}</p>
                <Link to={getDashboardPathForRole(user.role)} className="workspace-menu-link">Dashboard</Link>
                <button type="button" onClick={handleLogout} className="workspace-menu-link w-full text-danger">Logout</button>
              </div>}
            </div>
            <button type="button" onClick={() => setIsMobileNavOpen((current) => !current)} className="workspace-icon-button lg:hidden" aria-label={isMobileNavOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={isMobileNavOpen} aria-controls="workspace-navigation">
              {isMobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <nav id="workspace-navigation" aria-label="Workspace navigation" className={`${isMobileNavOpen ? 'block' : 'hidden'} border-t border-border lg:block`}>
          <div className="mx-auto flex max-w-[1440px] flex-col gap-1 px-4 py-2 sm:px-8 lg:flex-row lg:items-center lg:gap-5 lg:px-12">
            {navigationGroups.map((group) => <details key={`${group.label}-${location.pathname}`} className="workspace-nav-group relative">
              <summary className={`workspace-nav-trigger ${group.items.some((item) => item.to === location.pathname) ? 'workspace-nav-current' : ''}`}>
                {group.label === 'Overview' ? 'Your workspace' : group.label}<ChevronDown size={13} />
              </summary>
              <div className="workspace-nav-dropdown">
                {group.items.map((item) => { const Icon = item.icon; return <NavLink key={item.to} to={item.to} end className={({ isActive }) => `workspace-menu-link ${isActive ? 'bg-bg-secondary text-primary' : ''}`} onClick={(event) => event.currentTarget.closest('details').removeAttribute('open')}><Icon size={17} />{item.label}</NavLink>; })}
              </div>
            </details>)}
            <span className="ml-auto hidden text-[10px] uppercase tracking-[0.16em] text-text-muted lg:block">{user.role.replaceAll('_', ' ')}</span>
          </div>
        </nav>
      </header>
      <main id="main-content" className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-6 sm:px-8 lg:px-12 lg:pt-8">
        <div className="mb-8 flex items-center gap-2 text-[11px] text-text-muted"><Link to={getDashboardPathForRole(user.role)} className="hover:text-primary">The collective</Link><span>/</span><span className="text-text-primary">{currentPage.title}</span></div>
        <Outlet />
      </main>
      <footer className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-3 border-t border-border px-4 py-6 text-[10px] uppercase tracking-[0.16em] text-text-muted sm:px-8 lg:px-12"><span>Rooted in your institute. Open to possibility.</span><span>AlumniConnect collective</span></footer>
    </div>
  );
}

function LogoMark() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#dce9be] text-[#203c2b]">
      <GraduationCap className="h-5 w-5" strokeWidth={1.6} />
    </span>
  );
}

function Avatar({ name }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e7dfce] text-badge font-bold text-[#493f2b]">
      {getInitials(name)}
    </span>
  );
}

function getInitials(name = '') {
  return (
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'AC'
  );
}

export default AppLayout;
