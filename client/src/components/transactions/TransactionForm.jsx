import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { CATEGORIES } from '../../utils/categories';
import Spinner from '../ui/Spinner';

const TransactionForm = ({ onSubmit, defaultValues, isLoading }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {
      type: 'expense',
      date: format(new Date(), 'yyyy-MM-dd'),
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        date: defaultValues.date
          ? format(new Date(defaultValues.date), 'yyyy-MM-dd')
          : format(new Date(), 'yyyy-MM-dd'),
      });
    }
  }, [defaultValues, reset]);

  const type = watch('type');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Type toggle */}
      <div className="flex rounded-xl overflow-hidden gap-2">
        {['expense', 'income'].map((t) => (
          <label
            key={t}
            className={`flex-1 text-center py-2 text-sm font-medium cursor-pointer transition-colors rounded-xl border ${
              type === t
                ? t === 'expense'
                  ? 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30'
                  : 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30'
                : 'bg-transparent text-[#F5F5F0]/50 border-[#076653]/50 hover:border-[#076653]'
            }`}
          >
            <input type="radio" value={t} {...register('type')} className="sr-only" />
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </label>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#F5F5F0]/80 mb-1">Amount (₹)</label>
        <input
          type="number"
          step="0.01"
          {...register('amount', {
            required: 'Amount is required',
            min: { value: 0.01, message: 'Must be greater than 0' },
          })}
          className="w-full px-3 py-2 bg-[#06231D] border border-[#076653]/50 rounded-xl text-sm text-[#F5F5F0] placeholder-[#F5F5F0]/30 focus:outline-none focus:border-[#E3EF26] focus:ring-1 focus:ring-[#E3EF26]/10"
          placeholder="0"
        />
        {errors.amount && <p className="text-[#EF4444] text-xs mt-1">{errors.amount.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#F5F5F0]/80 mb-1">Category</label>
        <select
          {...register('category', { required: 'Category is required' })}
          className="w-full px-3 py-2 bg-[#06231D] border border-[#076653]/50 rounded-xl text-sm text-[#F5F5F0] focus:outline-none focus:border-[#E3EF26] focus:ring-1 focus:ring-[#E3EF26]/10 [&>option]:bg-[#06231D]"
        >
          <option value="">Select category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-[#EF4444] text-xs mt-1">{errors.category.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#F5F5F0]/80 mb-1">Date</label>
        <input
          type="date"
          {...register('date', { required: 'Date is required' })}
          className="w-full px-3 py-2 bg-[#06231D] border border-[#076653]/50 rounded-xl text-sm text-[#F5F5F0] focus:outline-none focus:border-[#E3EF26] focus:ring-1 focus:ring-[#E3EF26]/10"
        />
        {errors.date && <p className="text-[#EF4444] text-xs mt-1">{errors.date.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#F5F5F0]/80 mb-1">
          Description <span className="text-[#F5F5F0]/30 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          {...register('description')}
          className="w-full px-3 py-2 bg-[#06231D] border border-[#076653]/50 rounded-xl text-sm text-[#F5F5F0] placeholder-[#F5F5F0]/30 focus:outline-none focus:border-[#E3EF26] focus:ring-1 focus:ring-[#E3EF26]/10"
          placeholder="e.g. Groceries at DMart"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-[#E3EF26] hover:bg-[#D4E020] text-[#06231D] font-medium py-2.5 rounded-xl transition-colors disabled:opacity-60"
      >
        {isLoading ? <Spinner size="sm" /> : defaultValues?._id ? 'Update' : 'Add Transaction'}
      </button>
    </form>
  );
};

export default TransactionForm;
