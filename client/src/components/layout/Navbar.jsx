import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Sparkles, Crown } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-[#0C342C] border-b border-[#076653]/30 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 font-bold text-[#F5F5F0] text-xl">
          <Sparkles size={22} className="text-[#E3EF26]" />
          SmartSpend
        </Link>

        <div className="flex items-center gap-3">
          {user?.isPremium && (
            <span className="flex items-center gap-1 text-xs font-medium text-[#E3EF26] bg-[#E3EF26]/15 border border-[#E3EF26]/30 px-2 py-1 rounded-full">
              <Crown size={12} />
              Premium
            </span>
          )}
          <span className="text-sm text-[#F5F5F0]/70 hidden sm:block">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-[#076653]/30 text-[#F5F5F0]/60 transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
