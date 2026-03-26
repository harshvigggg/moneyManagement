import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import PaymentButton from '../components/premium/PaymentButton';
import { Sparkles, CheckCircle, Crown } from 'lucide-react';

const features = [
  'AI-powered monthly spending analysis',
  'Identify top spending categories',
  'Personalized savings tips',
  'Smart budget recommendations',
  'Powered by Google Gemini AI',
];

const UpgradePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user?.isPremium) {
    return (
      <Layout>
        <div className="max-w-md mx-auto text-center py-16">
          <div className="bg-[#0C342C] rounded-2xl border border-[#076653]/50 p-8">
            <div className="w-16 h-16 bg-[#22C55E]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={28} className="text-[#22C55E]" />
            </div>
            <h2 className="text-xl font-bold text-[#22C55E] mb-2">You're Premium!</h2>
            <p className="text-[#F5F5F0]/60 text-sm mb-6">
              Enjoy AI-powered insights and all premium features.
            </p>
            <button
              onClick={() => navigate('/insights')}
              className="text-[#E3EF26] hover:underline font-medium transition-colors"
            >
              Go to AI Insights →
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#E3EF26]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles size={28} className="text-[#E3EF26]" />
          </div>
          <h1 className="text-2xl font-bold text-[#F5F5F0] mb-2">Upgrade to Premium</h1>
          <p className="text-[#F5F5F0]/60 text-sm">One-time payment. Unlock AI insights forever.</p>
        </div>

        <div className="bg-[#0C342C] rounded-2xl border border-[#E3EF26]/20 p-6 mb-6" style={{ boxShadow: '0 0 40px rgba(227,239,38,0.15)' }}>
          <div className="text-center mb-6">
            <span className="text-4xl font-bold text-[#E3EF26]">₹99</span>
            <span className="text-[#F5F5F0]/40 ml-1">one-time</span>
          </div>

          <ul className="space-y-3 mb-6">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-[#F5F5F0]/80">
                <CheckCircle size={16} className="text-[#22C55E] flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <PaymentButton onSuccess={() => navigate('/insights')} />

          <p className="text-xs text-[#F5F5F0]/40 text-center mt-3">
            Secured by Razorpay · Test mode active
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default UpgradePage;
