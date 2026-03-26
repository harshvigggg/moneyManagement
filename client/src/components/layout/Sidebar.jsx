import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, Sparkles, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/insights', icon: Sparkles, label: 'AI Insights', premiumOnly: true },
  { to: '/upgrade', icon: Zap, label: 'Upgrade', hideIfPremium: true },
];

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="w-56 hidden md:flex flex-col gap-1 pt-6 px-3 bg-[#0C342C] border-r border-[#076653]/30">
      {navItems.map(({ to, icon: Icon, label, premiumOnly, hideIfPremium }) => {
        if (hideIfPremium && user?.isPremium) return null;
        return (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#E3EF26]/10 text-[#E3EF26] border border-[#E3EF26]/20'
                  : 'text-[#F5F5F0]/60 hover:bg-[#076653]/30 hover:text-[#F5F5F0]'
              }`
            }
          >
            <Icon size={18} />
            {label}
            {premiumOnly && !user?.isPremium && (
              <span className="ml-auto text-[10px] bg-[#E3EF26]/15 text-[#E3EF26] px-1.5 py-0.5 rounded-full font-semibold">
                PRO
              </span>
            )}
          </NavLink>
        );
      })}
    </aside>
  );
};

export default Sidebar;
