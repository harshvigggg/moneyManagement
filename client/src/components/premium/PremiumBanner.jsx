import { Link } from 'react-router-dom';
import { Sparkles, Zap } from 'lucide-react';

const PremiumBanner = () => (
  <div
    className="bg-gradient-to-r from-[#076653] to-[#0C342C] rounded-2xl p-6 text-center border border-[#E3EF26]/20"
    style={{ boxShadow: '0 0 40px rgba(227,239,38,0.15)' }}
  >
    <div className="flex justify-center mb-3">
      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
        <Sparkles size={24} className="text-[#F5F5F0]" />
      </div>
    </div>
    <h2 className="text-xl font-bold mb-2 text-[#F5F5F0]">Unlock AI Insights</h2>
    <p className="text-[#F5F5F0]/70 text-sm mb-5 max-w-sm mx-auto">
      Get personalized spending analysis, savings tips, and budget recommendations powered by Gemini AI.
    </p>
    <Link
      to="/upgrade"
      className="inline-flex items-center gap-2 bg-[#E3EF26] text-[#06231D] font-semibold px-6 py-2.5 rounded-xl hover:bg-[#D4E020] transition-colors"
    >
      <Zap size={16} />
      Upgrade for ₹99
    </Link>
  </div>
);

export default PremiumBanner;
