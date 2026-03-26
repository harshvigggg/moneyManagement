const Transaction = require('../models/Transaction');
const { getSpendingInsights } = require('../services/geminiService');

// GET /api/ai/insights
exports.getInsights = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const transactions = await Transaction.find({
      userId: req.user._id,
      date: { $gte: thirtyDaysAgo },
    }).select('type amount category date');

    if (transactions.length < 3) {
      return res.status(400).json({
        message: 'Add at least 3 transactions in the last 30 days to get AI insights.',
      });
    }

    const insights = await getSpendingInsights(transactions);
    res.json(insights);
  } catch (error) {
    // Handle JSON parse errors from Gemini
    if (error instanceof SyntaxError) {
      return res.status(500).json({ message: 'Failed to parse AI response. Please try again.' });
    }
    res.status(500).json({ message: error.message });
  }
};
