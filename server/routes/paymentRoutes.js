const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const verifyToken = require('../middleware/authMiddleware');

router.use(verifyToken);

router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);

module.exports = router;
