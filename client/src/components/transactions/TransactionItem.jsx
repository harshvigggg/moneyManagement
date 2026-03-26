import { Pencil, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { CATEGORY_COLORS } from '../../utils/categories';

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  const isExpense = transaction.type === 'expense';

  return (
    <div className="flex items-center gap-3 p-4 bg-[#06231D] rounded-xl border border-[#076653]/30 hover:border-[#076653]/50 transition-colors">
      {/* Category dot */}
      <div
        className="w-3 h-3 rounded-full flex-shrink-0"
        style={{ backgroundColor: CATEGORY_COLORS[transaction.category] || '#6b7280' }}
      />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#F5F5F0] truncate">
          {transaction.description || transaction.category}
        </p>
        <p className="text-xs text-[#F5F5F0]/40">
          {transaction.category} · {formatDate(transaction.date)}
        </p>
      </div>

      <p className={`text-sm font-semibold font-mono flex-shrink-0 ${isExpense ? 'text-[#EF4444]' : 'text-[#22C55E]'}`}>
        {isExpense ? '-' : '+'}{formatCurrency(transaction.amount)}
      </p>

      <div className="flex gap-1 flex-shrink-0">
        <button
          onClick={() => onEdit(transaction)}
          className="p-1.5 rounded-lg text-[#F5F5F0]/30 hover:text-[#E3EF26] transition-colors"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(transaction._id)}
          className="p-1.5 rounded-lg text-[#F5F5F0]/30 hover:text-[#EF4444] transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
