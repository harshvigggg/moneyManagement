const Transaction = require('../models/Transaction');

// GET /api/transactions
exports.getTransactions = async (req, res) => {
  try {
    const { month, type, category } = req.query;
    const filter = { userId: req.user._id };

    if (month) {
      const [year, m] = month.split('-').map(Number);
      filter.date = {
        $gte: new Date(year, m - 1, 1),
        $lt: new Date(year, m, 1),
      };
    }
    if (type) filter.type = type;
    if (category) filter.category = category;

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/transactions
exports.createTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;

    const transaction = await Transaction.create({
      userId: req.user._id,
      type,
      amount,
      category,
      description,
      date: date || new Date(),
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/transactions/:id
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const { type, amount, category, description, date } = req.body;
    transaction.type = type ?? transaction.type;
    transaction.amount = amount ?? transaction.amount;
    transaction.category = category ?? transaction.category;
    transaction.description = description ?? transaction.description;
    transaction.date = date ?? transaction.date;

    const updated = await transaction.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/transactions/:id
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/transactions/summary
exports.getSummary = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
        },
      },
    ]);

    const summary = { income: 0, expense: 0 };
    result.forEach((r) => {
      summary[r._id] = r.total;
    });
    summary.balance = summary.income - summary.expense;

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/transactions/monthly
exports.getMonthly = async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const result = await Transaction.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            type: '$type',
          },
          total: { $sum: '$amount' },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    // Build a map: "2026-03" -> { income: X, expense: Y }
    const monthMap = {};
    result.forEach(({ _id, total }) => {
      const key = `${_id.year}-${String(_id.month).padStart(2, '0')}`;
      if (!monthMap[key]) monthMap[key] = { month: key, income: 0, expense: 0 };
      monthMap[key][_id.type] = total;
    });

    res.json(Object.values(monthMap));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
