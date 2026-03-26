import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

const IncomeCard = ({ amount }) => (
  <div className="bg-[#0C342C] rounded-2xl p-6 border border-[#076653]/50 hover:border-[#076653] transition-colors flex items-center gap-4">
    <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#22C55E]/15">
      <TrendingUp size={20} className="text-[#22C55E]" />
    </div>
    <div>
      <p className="text-sm text-[#F5F5F0]/50">Total Income</p>
      <p className="text-2xl font-bold font-[family-name:'JetBrains_Mono'] text-[#22C55E]">
        {formatCurrency(amount)}
      </p>
    </div>
  </div>
);

const ExpenseCard = ({ amount }) => (
  <div className="bg-[#0C342C] rounded-2xl p-6 border border-[#076653]/50 hover:border-[#076653] transition-colors flex items-center gap-4">
    <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#EF4444]/15">
      <TrendingDown size={20} className="text-[#EF4444]" />
    </div>
    <div>
      <p className="text-sm text-[#F5F5F0]/50">Total Expenses</p>
      <p className="text-2xl font-bold font-[family-name:'JetBrains_Mono'] text-[#EF4444]">
        {formatCurrency(amount)}
      </p>
    </div>
  </div>
);

const BalanceCard = ({ amount }) => (
  <div className="bg-[#0C342C] rounded-2xl p-6 border border-[#076653]/50 hover:border-[#076653] transition-colors flex items-center gap-4">
    <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#E3EF26]/15">
      <Wallet size={20} className="text-[#E3EF26]" />
    </div>
    <div>
      <p className="text-sm text-[#F5F5F0]/50">Net Balance</p>
      <p
        className={`text-2xl font-bold font-[family-name:'JetBrains_Mono'] ${
          amount >= 0 ? 'text-[#E3EF26]' : 'text-[#F59E0B]'
        }`}
      >
        {formatCurrency(amount)}
      </p>
    </div>
  </div>
);

const SummaryCards = ({ summary }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <IncomeCard amount={summary.income} />
    <ExpenseCard amount={summary.expense} />
    <BalanceCard amount={summary.balance} />
  </div>
);

export default SummaryCards;
