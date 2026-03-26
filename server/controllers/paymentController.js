const crypto = require('crypto');
const razorpay = require('../services/razorpayService');
const User = require('../models/User');

// POST /api/payment/create-order
exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: 9900, // ₹99 in paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
      notes: { userId: req.user._id.toString() },
    };

    const order = await razorpay.orders.create(options);

    // Save order id on user for verification
    await User.findByIdAndUpdate(req.user._id, { razorpayOrderId: order.id });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Payment error full:', JSON.stringify(error, null, 2));
    console.error('Payment error message:', error.message);
    console.error('Payment error statusCode:', error.statusCode);
    console.error('Payment error description:', error.error?.description);
    res.status(500).json({ message: error.error?.description || error.message || 'Payment failed' });
  }
};

// POST /api/payment/verify
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing payment details' });
    }

    // Verify HMAC signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed. Invalid signature.' });
    }

    // Unlock premium
    await User.findByIdAndUpdate(req.user._id, {
      isPremium: true,
      premiumSince: new Date(),
    });

    res.json({ message: 'Payment verified! Premium unlocked.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
