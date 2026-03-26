import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { formatMonth } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/formatCurrency';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#06231D] border border-[#076653] rounded-lg px-3 py-2 shadow-lg">
        <p className="text-[#F5F5F0] text-sm font-medium mb-1">{label}</p>
        {payload.map((entry) => (
          <p key={entry.dataKey} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const MonthlyBarChart = ({ data }) => {
  const formatted = data.map((d) => ({ ...d, month: formatMonth(d.month) }));

  if (data.length === 0) {
    return (
      <div className="bg-[#0C342C] rounded-2xl p-6 border border-[#076653]/50">
        <h3 className="text-sm font-semibold text-[#F5F5F0] mb-4">Monthly Overview</h3>
        <p className="text-sm text-[#F5F5F0]/40 text-center py-8">No data yet</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0C342C] rounded-2xl p-6 border border-[#076653]/50">
      <h3 className="text-sm font-semibold text-[#F5F5F0] mb-4">Monthly Overview (Last 6 Months)</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={formatted} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(7,102,83,0.3)" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: 'rgba(245,245,240,0.5)' }}
            axisLine={{ stroke: 'rgba(7,102,83,0.3)' }}
            tickLine={{ stroke: 'rgba(7,102,83,0.3)' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: 'rgba(245,245,240,0.5)' }}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            axisLine={{ stroke: 'rgba(7,102,83,0.3)' }}
            tickLine={{ stroke: 'rgba(7,102,83,0.3)' }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(7,102,83,0.15)' }} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => <span style={{ color: 'rgba(245,245,240,0.7)' }}>{value}</span>}
          />
          <Bar dataKey="income" fill="#22C55E" radius={[4, 4, 0, 0]} name="Income" />
          <Bar dataKey="expense" fill="#EF4444" radius={[4, 4, 0, 0]} name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;
