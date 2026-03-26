import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { Zap } from 'lucide-react';
import Spinner from '../ui/Spinner';

const PaymentButton = ({ onSuccess }) => {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    setLoading(true);

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error('Failed to load Razorpay. Check your connection.');
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.post('/payment/create-order');

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'SmartSpend',
        description: 'Unlock Premium – AI Insights',
        order_id: data.orderId,
        handler: async (response) => {
          try {
            await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            await refreshUser();
            toast.success('Premium unlocked! Enjoy AI Insights.');
            onSuccess?.();
          } catch {
            toast.error('Payment verification failed. Contact support.');
          }
        },
        prefill: { name: user?.name, email: user?.email },
        theme: { color: '#076653' },
        modal: { ondismiss: () => setLoading(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', () => {
        toast.error('Payment failed. Please try again.');
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not initiate payment');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-[#E3EF26] hover:bg-[#D4E020] text-[#06231D] font-semibold py-3 rounded-xl transition-colors disabled:opacity-60 text-lg"
    >
      {loading ? <Spinner size="sm" /> : <><Zap size={18} /> Pay ₹99 & Unlock Premium</>}
    </button>
  );
};

export default PaymentButton;
