import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CATEGORY_COLORS } from '../../utils/categories';
import { formatCurrency } from '../../utils/formatCurrency';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#06231D] border border-[#076653] rounded-lg px-3 py-2 shadow-lg">
        <p className="text-[#F5F5F0] text-sm font-medium">{payload[0].name}</p>
        <p className="text-[#F5F5F0]/70 text-sm">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

const CategoryPieChart = ({ transactions }) => {
  // Aggregate expenses by category
  const data = Object.entries(
    transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {})
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  if (data.length === 0) {
    return (
      <div className="bg-[#0C342C] rounded-2xl p-6 border border-[#076653]/50">
        <h3 className="text-sm font-semibold text-[#F5F5F0] mb-4">Spending by Category</h3>
        <p className="text-sm text-[#F5F5F0]/40 text-center py-8">No expense data yet</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0C342C] rounded-2xl p-6 border border-[#076653]/50">
      <h3 className="text-sm font-semibold text-[#F5F5F0] mb-4">Spending by Category</h3>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
            {data.map((entry) => (
              <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#6b7280'} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => <span style={{ color: 'rgba(245,245,240,0.7)' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
