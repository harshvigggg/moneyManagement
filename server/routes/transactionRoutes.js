const express = require('express');
const router = express.Router();
const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary,
  getMonthly,
} = require('../controllers/transactionController');
const verifyToken = require('../middleware/authMiddleware');

// All routes require auth
router.use(verifyToken);

router.get('/summary', getSummary);
router.get('/monthly', getMonthly);
router.get('/', getTransactions);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;
