import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Zap,
  PieChart,
  CreditCard,
  Globe,
  Lock,
  Menu,
  X,
  Star,
  ArrowRight,
  Play,
  TrendingUp,
  ChevronUp,
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
];

const PARTNER_LOGOS = ['Boltshift', 'Lightbox', 'FeatherDev', 'GlobalBank', 'Nietzsche'];

const FEATURES = [
  {
    icon: Shield,
    title: 'Bank-Grade Security',
    desc: 'Your data is protected with 256-bit AES encryption and multi-factor authentication at every layer.',
  },
  {
    icon: Zap,
    title: 'AI Insights',
    desc: 'Machine-learning models analyse your spending patterns and surface actionable recommendations in real time.',
  },
  {
    icon: PieChart,
    title: 'Smart Analytics',
    desc: 'Interactive dashboards and detailed breakdowns give you complete visibility into where your money goes.',
  },
  {
    icon: CreditCard,
    title: 'Virtual Cards',
    desc: 'Generate single-use or recurring virtual cards for safer online payments and subscription management.',
  },
  {
    icon: Globe,
    title: 'Global Access',
    desc: 'Track multi-currency accounts and international transactions with automatic conversion and alerts.',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    desc: 'We never sell your data. Granular privacy controls let you decide exactly what is shared and with whom.',
  },
];

const STATS = [
  { value: '$2.4B+', label: 'Transactions tracked' },
  { value: '500K+', label: 'Active users' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '150+', label: 'Countries supported' },
];

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Freelance Designer',
    quote:
      'SmartSpend completely transformed how I manage invoices and expenses. The AI insights alone saved me thousands last quarter.',
    avatar: 'PS',
    stars: 5,
  },
  {
    name: 'James Okonkwo',
    role: 'Startup Founder',
    quote:
      'We switched our entire team to SmartSpend. The virtual cards and spending controls are a game-changer for managing burn rate.',
    avatar: 'JO',
    stars: 5,
  },
  {
    name: 'Emily Chen',
    role: 'Product Manager',
    quote:
      'The analytics dashboard is gorgeous and genuinely useful. I finally have a clear picture of my financial health.',
    avatar: 'EC',
    stars: 5,
  },
];

const FOOTER_LINKS = {
  Product: ['Features', 'Pricing', 'Integrations', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Documentation', 'Help Center', 'Community', 'API'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-deep-forest text-cream font-sans overflow-x-hidden">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-deep-forest/80 backdrop-blur-md border-b border-emerald-border/30">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime text-deep-forest font-bold text-lg select-none transition-shadow group-hover:shadow-[0_0_20px_rgba(227,239,38,0.35)]">
              S
            </span>
            <span className="text-lg font-semibold tracking-tight">SmartSpend</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-cream/70 hover:text-cream transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm rounded-lg text-cream/80 hover:text-cream border border-emerald-border/50 hover:border-emerald-border transition-all"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm rounded-lg bg-lime text-deep-forest font-semibold hover:bg-lime-hover transition-all hover:shadow-[0_0_24px_rgba(227,239,38,0.3)]"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-cream/80 hover:text-cream"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-deep-forest/95 backdrop-blur-lg border-t border-emerald-border/30 px-6 pb-6 pt-4 space-y-4 animate-[fadeIn_0.2s_ease]">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block text-sm text-cream/70 hover:text-cream transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              <Link
                to="/login"
                className="text-center px-4 py-2.5 text-sm rounded-lg text-cream/80 border border-emerald-border/50 hover:border-emerald-border transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-center px-4 py-2.5 text-sm rounded-lg bg-lime text-deep-forest font-semibold hover:bg-lime-hover transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden grain-overlay">
        {/* Glow blobs */}
        <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-lime/10 blur-[160px]" />
        <div className="pointer-events-none absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-emerald-border/20 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-lime/5 blur-[180px]" />

        <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-border/50 bg-forest/50 text-xs text-cream/60 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
              Now with AI-powered insights
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              Shaping Financial{' '}
              <span className="text-lime">futures</span> with expertise and care.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-cream/60 leading-relaxed max-w-lg">
              Track spending, set budgets, and unlock AI-driven insights that help you save smarter
              and grow wealth effortlessly — all from one elegant dashboard.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lime text-deep-forest font-semibold hover:bg-lime-hover transition-all hover:shadow-[0_0_32px_rgba(227,239,38,0.3)] group"
              >
                Get Started
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-emerald-border/60 text-cream/80 hover:text-cream hover:border-emerald-border transition-all group">
                <Play
                  size={16}
                  className="transition-transform group-hover:scale-110"
                />
                Watch Demo
              </button>
            </div>

            <div className="mt-10 flex items-center gap-4 text-sm text-cream/40">
              <div className="flex -space-x-2">
                {['AK', 'MR', 'SJ', 'DP'].map((initials) => (
                  <span
                    key={initials}
                    className="w-8 h-8 rounded-full border-2 border-deep-forest bg-forest flex items-center justify-center text-[10px] font-semibold text-cream/70"
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <span>
                Joined by <span className="text-cream/60 font-medium">500K+</span> users
              </span>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="relative hidden lg:flex justify-center">
            {/* Phone frame */}
            <div className="relative w-[280px] h-[560px] rounded-[2.5rem] border-2 border-emerald-border/40 bg-gradient-to-b from-forest to-deep-forest shadow-2xl overflow-hidden">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 rounded-b-2xl bg-deep-forest" />
              {/* Screen content */}
              <div className="mt-10 px-5 space-y-4">
                <div className="text-xs text-cream/40">Good morning</div>
                <div className="text-lg font-semibold">Dashboard</div>

                {/* Balance card */}
                <div className="rounded-2xl bg-deep-forest/80 border border-emerald-border/30 p-4">
                  <div className="text-[10px] text-cream/40 uppercase tracking-wider">
                    Total Balance
                  </div>
                  <div className="text-2xl font-bold mt-1">Rs. 64,573</div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-income">
                    <TrendingUp size={10} />
                    +12.4% this month
                  </div>
                </div>

                {/* Mini chart placeholder */}
                <div className="rounded-2xl bg-deep-forest/80 border border-emerald-border/30 p-4">
                  <div className="text-[10px] text-cream/40 uppercase tracking-wider mb-3">
                    Weekly Spending
                  </div>
                  <div className="flex items-end gap-1.5 h-16">
                    {[40, 65, 45, 80, 55, 70, 50].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-lime/60"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="grid grid-cols-3 gap-2">
                  {['Send', 'Request', 'Cards'].map((a) => (
                    <div
                      key={a}
                      className="rounded-xl bg-deep-forest/80 border border-emerald-border/30 py-2.5 text-center text-[10px] text-cream/60"
                    >
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -left-12 top-16 bg-forest/90 backdrop-blur border border-emerald-border/40 rounded-2xl px-4 py-3 shadow-xl animate-[float_6s_ease-in-out_infinite]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-lime/20 flex items-center justify-center">
                  <CreditCard size={14} className="text-lime" />
                </div>
                <div>
                  <div className="text-[10px] text-cream/50">Bitcoin</div>
                  <div className="text-xs font-semibold">+5.23%</div>
                </div>
              </div>
            </div>

            <div className="absolute -right-8 top-40 bg-forest/90 backdrop-blur border border-emerald-border/40 rounded-2xl px-4 py-3 shadow-xl animate-[float_6s_ease-in-out_infinite_1s]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-lime/20 flex items-center justify-center">
                  <TrendingUp size={14} className="text-lime" />
                </div>
                <div>
                  <div className="text-[10px] text-cream/50">Savings Goal</div>
                  <div className="text-xs font-semibold">78% reached</div>
                </div>
              </div>
            </div>

            <div className="absolute -left-6 bottom-28 bg-forest/90 backdrop-blur border border-emerald-border/40 rounded-2xl px-4 py-3 shadow-xl animate-[float_6s_ease-in-out_infinite_2s]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-income/20 flex items-center justify-center">
                  <ChevronUp size={14} className="text-income" />
                </div>
                <div>
                  <div className="text-[10px] text-cream/50">Income</div>
                  <div className="text-xs font-semibold">Rs. 1,20,000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Client Logos ───────────────────────────────────────────────────── */}
      <section className="relative py-16 border-y border-emerald-border/20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-cream/30 mb-10">
            Trusted by forward-thinking companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {PARTNER_LOGOS.map((name) => (
              <span
                key={name}
                className="text-lg sm:text-xl font-semibold tracking-tight text-cream/20 hover:text-cream/40 transition-colors select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────────── */}
      <section id="features" className="relative py-24 md:py-32 grain-overlay">
        <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-lime/5 blur-[180px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-lime mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Everything you need to master your money
            </h2>
            <p className="mt-4 text-cream/50 leading-relaxed">
              Powerful tools designed to give you clarity, control, and confidence over every rupee.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl bg-forest/50 border border-emerald-border/50 p-6 transition-all duration-300 hover:border-lime/50 hover:shadow-[0_0_40px_rgba(227,239,38,0.06)]"
              >
                <div className="w-11 h-11 rounded-xl bg-lime/10 flex items-center justify-center mb-4 transition-colors group-hover:bg-lime/20">
                  <Icon size={20} className="text-lime" />
                </div>
                <h3 className="text-base font-semibold mb-2">{title}</h3>
                <p className="text-sm text-cream/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────────── */}
      <section className="py-20 border-y border-emerald-border/20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl sm:text-4xl font-bold text-lime">{value}</div>
                <div className="mt-1 text-sm text-cream/40">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 grain-overlay">
        <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-emerald-border/10 blur-[160px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-lime mb-3">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Loved by thousands of users
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ name, role, quote, avatar, stars }) => (
              <div
                key={name}
                className="rounded-2xl bg-forest/50 border border-emerald-border/50 p-6 transition-all duration-300 hover:border-lime/50"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-lime text-lime"
                    />
                  ))}
                </div>
                <p className="text-sm text-cream/70 leading-relaxed mb-6">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-lime/15 flex items-center justify-center text-xs font-semibold text-lime">
                    {avatar}
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{name}</div>
                    <div className="text-xs text-cream/40">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[700px] h-[400px] rounded-full bg-lime/8 blur-[180px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Ready to take control of your{' '}
            <span className="text-lime">financial future</span>?
          </h2>
          <p className="mt-5 text-cream/50 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Join 500,000+ users who have already transformed how they manage, save, and grow their money.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-lime text-deep-forest font-semibold hover:bg-lime-hover transition-all hover:shadow-[0_0_40px_rgba(227,239,38,0.3)] group"
            >
              Sign Up Free
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-emerald-border/60 text-cream/80 hover:text-cream hover:border-emerald-border transition-all"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-emerald-border/20 pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime text-deep-forest font-bold text-lg select-none">
                  S
                </span>
                <span className="text-lg font-semibold tracking-tight">SmartSpend</span>
              </Link>
              <p className="text-sm text-cream/40 leading-relaxed max-w-xs">
                Empowering you to make smarter financial decisions every day.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-cream/50 mb-4">
                  {heading}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-cream/40 hover:text-cream transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-emerald-border/20">
            <p className="text-xs text-cream/30">
              &copy; {new Date().getFullYear()} SmartSpend. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {['Twitter', 'GitHub', 'LinkedIn', 'Instagram'].map((name) => (
                <a
                  key={name}
                  href="#"
                  className="text-cream/30 hover:text-cream/60 transition-colors text-sm"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── Keyframes (injected via style tag) ─────────────────────────────── */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
