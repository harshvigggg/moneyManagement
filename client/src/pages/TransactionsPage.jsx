import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import FilterBar from '../components/transactions/FilterBar';
import TransactionItem from '../components/transactions/TransactionItem';
import TransactionForm from '../components/transactions/TransactionForm';
import Modal from '../components/ui/Modal';
import { useTransactions } from '../hooks/useTransactions';
import Spinner from '../components/ui/Spinner';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';

const TransactionsPage = () => {
  const { transactions, loading, fetchTransactions, addTransaction, updateTransaction, deleteTransaction } =
    useTransactions();
  const [filters, setFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchTransactions(filters);
  }, [filters]);

  const handleSubmit = async (data) => {
    setFormLoading(true);
    try {
      if (editingTx) {
        await updateTransaction(editingTx._id, data);
        toast.success('Transaction updated');
      } else {
        await addTransaction(data);
        toast.success('Transaction added');
      }
      setIsModalOpen(false);
      setEditingTx(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (tx) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this transaction?')) return;
    try {
      await deleteTransaction(id);
      toast.success('Deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const openAdd = () => {
    setEditingTx(null);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#F5F5F0]">Transactions</h1>
            <p className="text-sm text-[#F5F5F0]/40">{transactions.length} records</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-[#E3EF26] hover:bg-[#D4E020] text-[#06231D] font-medium px-4 py-2 rounded-xl transition-colors text-sm"
          >
            <Plus size={16} />
            Add
          </button>
        </div>

        <FilterBar filters={filters} onChange={setFilters} />

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-[#F5F5F0]/40">No transactions found</p>
            <p className="text-sm mt-1 text-[#F5F5F0]/40">
              Try changing the filters or{' '}
              <button onClick={openAdd} className="text-[#E3EF26] hover:underline">
                add a new one
              </button>
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.map((t) => (
              <TransactionItem
                key={t._id}
                transaction={t}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingTx(null); }}
        title={editingTx ? 'Edit Transaction' : 'Add Transaction'}
      >
        <TransactionForm
          onSubmit={handleSubmit}
          defaultValues={editingTx}
          isLoading={formLoading}
        />
      </Modal>
    </Layout>
  );
};

export default TransactionsPage;
