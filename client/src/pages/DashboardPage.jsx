import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import SummaryCards from '../components/dashboard/SummaryCards';
import CategoryPieChart from '../components/dashboard/CategoryPieChart';
import MonthlyBarChart from '../components/dashboard/MonthlyBarChart';
import TransactionItem from '../components/transactions/TransactionItem';
import { useTransactions } from '../hooks/useTransactions';
import api from '../api/axios';
import Spinner from '../components/ui/Spinner';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { transactions, loading, fetchTransactions } = useTransactions();
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [monthly, setMonthly] = useState([]);

  useEffect(() => {
    fetchTransactions();
    api.get('/transactions/summary').then((r) => setSummary(r.data));
    api.get('/transactions/monthly').then((r) => setMonthly(r.data));
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  const recent = transactions.slice(0, 5);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-[#F5F5F0]">Dashboard</h1>
          <p className="text-sm text-[#F5F5F0]/50">Your financial overview</p>
        </div>

        <SummaryCards summary={summary} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CategoryPieChart transactions={transactions} />
          <MonthlyBarChart data={monthly} />
        </div>

        {/* Recent transactions */}
        <div className="bg-[#0C342C] rounded-2xl border border-[#076653]/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#F5F5F0]">Recent Transactions</h3>
            <Link to="/transactions" className="text-xs text-[#E3EF26] hover:underline">
              View all
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-[#F5F5F0]/40 text-center py-6">
              No transactions yet.{' '}
              <Link to="/transactions" className="text-[#E3EF26] hover:underline">
                Add one
              </Link>
            </p>
          ) : (
            <div className="space-y-2">
              {recent.map((t) => (
                <TransactionItem key={t._id} transaction={t} onEdit={() => {}} onDelete={() => {}} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
