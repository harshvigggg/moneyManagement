import { AlertTriangle, Lightbulb, TrendingDown, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

const AIInsightsCard = ({ insights }) => {
  if (!insights) return null;

  return (
    <div className="space-y-4">
      {/* Overview */}
      <div className="bg-[#E3EF26]/5 border border-[#E3EF26]/20 rounded-2xl p-5">
        <h3 className="font-semibold text-[#E3EF26] mb-2">Financial Overview</h3>
        <p className="text-sm text-[#F5F5F0]/70">{insights.overview}</p>
      </div>

      {/* Top Categories */}
      {insights.topCategories?.length > 0 && (
        <div className="bg-[#0C342C] border border-[#076653]/50 rounded-2xl p-5">
          <h3 className="font-semibold text-[#F5F5F0] mb-3 flex items-center gap-2">
            <TrendingDown size={16} className="text-[#EF4444]" /> Top Spending
          </h3>
          <div className="space-y-2">
            {insights.topCategories.map((c) => (
              <div key={c.category} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-[#F5F5F0]/80">{c.category}</p>
                  <p className="text-xs text-[#F5F5F0]/40">{c.insight}</p>
                </div>
                <p className="text-sm font-semibold text-[#F5F5F0] flex-shrink-0">
                  {formatCurrency(c.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overspending Warnings */}
      {insights.overspendingWarnings?.length > 0 && (
        <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/20 rounded-2xl p-5">
          <h3 className="font-semibold text-[#F59E0B] mb-3 flex items-center gap-2">
            <AlertTriangle size={16} /> Warnings
          </h3>
          <ul className="space-y-1.5">
            {insights.overspendingWarnings.map((w, i) => (
              <li key={i} className="text-sm text-[#F59E0B]/90 flex items-start gap-2">
                <span className="text-[#F59E0B]/50 mt-0.5">•</span> {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Savings Tips */}
      {insights.savingsTips?.length > 0 && (
        <div className="bg-[#22C55E]/5 border border-[#22C55E]/20 rounded-2xl p-5">
          <h3 className="font-semibold text-[#22C55E] mb-3 flex items-center gap-2">
            <Lightbulb size={16} /> Savings Tips
          </h3>
          <ul className="space-y-1.5">
            {insights.savingsTips.map((t, i) => (
              <li key={i} className="text-sm text-[#22C55E]/80 flex items-start gap-2">
                <CheckCircle size={14} className="text-[#22C55E] flex-shrink-0 mt-0.5" /> {t}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Budget Recommendation */}
      {insights.budgetRecommendation && (
        <div className="bg-[#8B5CF6]/5 border border-[#8B5CF6]/20 rounded-2xl p-5">
          <h3 className="font-semibold text-[#8B5CF6] mb-2">Budget Recommendation</h3>
          <p className="text-sm text-[#8B5CF6]/80">{insights.budgetRecommendation}</p>
        </div>
      )}
    </div>
  );
};

export default AIInsightsCard;
