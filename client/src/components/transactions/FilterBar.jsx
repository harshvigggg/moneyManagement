import { format } from 'date-fns';
import { CATEGORIES } from '../../utils/categories';

const FilterBar = ({ filters, onChange }) => {
  const currentMonth = format(new Date(), 'yyyy-MM');

  return (
    <div className="flex flex-wrap gap-2">
      <input
        type="month"
        value={filters.month || ''}
        onChange={(e) => onChange({ ...filters, month: e.target.value })}
        className="px-3 py-1.5 bg-[#0C342C] border border-[#076653]/50 rounded-xl text-sm text-[#F5F5F0] focus:outline-none focus:border-[#E3EF26] focus:ring-1 focus:ring-[#E3EF26]/10"
      />

      <select
        value={filters.type || ''}
        onChange={(e) => onChange({ ...filters, type: e.target.value })}
        className="px-3 py-1.5 bg-[#0C342C] border border-[#076653]/50 rounded-xl text-sm text-[#F5F5F0] focus:outline-none focus:border-[#E3EF26] focus:ring-1 focus:ring-[#E3EF26]/10 [&>option]:bg-[#0C342C]"
      >
        <option value="">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={filters.category || ''}
        onChange={(e) => onChange({ ...filters, category: e.target.value })}
        className="px-3 py-1.5 bg-[#0C342C] border border-[#076653]/50 rounded-xl text-sm text-[#F5F5F0] focus:outline-none focus:border-[#E3EF26] focus:ring-1 focus:ring-[#E3EF26]/10 [&>option]:bg-[#0C342C]"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <button
        onClick={() => onChange({})}
        className="px-3 py-1.5 text-sm text-[#F5F5F0]/40 hover:text-[#EF4444] rounded-xl transition-colors"
      >
        Clear
      </button>
    </div>
  );
};

export default FilterBar;
