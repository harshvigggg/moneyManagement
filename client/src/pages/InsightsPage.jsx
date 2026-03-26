import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import PremiumBanner from '../components/premium/PremiumBanner';
import AIInsightsCard from '../components/premium/AIInsightsCard';
import { useAIInsights } from '../hooks/useAIInsights';
import Spinner from '../components/ui/Spinner';
import { Sparkles, RefreshCw } from 'lucide-react';

const InsightsPage = () => {
  const { user } = useAuth();
  const { insights, loading, error, fetchInsights } = useAIInsights();

  if (!user?.isPremium) {
    return (
      <Layout>
        <div className="max-w-lg mx-auto py-10">
          <PremiumBanner />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles size={22} className="text-[#E3EF26]" />
            <div>
              <h1 className="text-xl font-bold text-[#F5F5F0]">AI Insights</h1>
              <p className="text-sm text-[#F5F5F0]/50">Powered by Gemini AI · Last 30 days</p>
            </div>
          </div>
          <button
            onClick={fetchInsights}
            disabled={loading}
            className="flex items-center gap-2 border border-[#E3EF26]/50 text-[#E3EF26] hover:bg-[#E3EF26]/10 font-medium px-4 py-2 rounded-xl transition-colors text-sm disabled:opacity-60"
          >
            {loading ? <Spinner size="sm" /> : <><RefreshCw size={15} /> Refresh</>}
          </button>
        </div>

        {!insights && !loading && !error && (
          <div className="text-center py-16">
            <Sparkles size={40} className="mx-auto mb-3 text-[#F5F5F0]/20" />
            <p className="font-medium text-[#F5F5F0]/40">Click below to analyze your spending</p>
            <p className="text-sm mt-1 text-[#F5F5F0]/30">Requires at least 3 transactions in the last 30 days</p>
            <button
              onClick={fetchInsights}
              className="mt-5 inline-flex items-center gap-2 bg-[#E3EF26] text-[#06231D] font-semibold px-6 py-2.5 rounded-xl hover:bg-[#D4E020] transition-colors"
            >
              <Sparkles size={16} /> Analyze My Spending
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center py-16 gap-3">
            <Spinner size="lg" />
            <p className="text-sm text-[#F5F5F0]/50">Analyzing your transactions...</p>
          </div>
        )}

        {insights && !loading && <AIInsightsCard insights={insights} />}

        {error && !loading && (
          <div className="text-center py-8 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-2xl p-5">
            <p className="text-[#EF4444]">{error}</p>
            <button onClick={fetchInsights} className="mt-2 text-sm text-[#E3EF26] hover:underline flex items-center gap-1 mx-auto">
              <RefreshCw size={14} /> Try again
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InsightsPage;
