const express = require('express');
const router = express.Router();
const { getInsights } = require('../controllers/aiController');
const verifyToken = require('../middleware/authMiddleware');
const isPremium = require('../middleware/premiumMiddleware');

router.get('/insights', verifyToken, isPremium, getInsights);

module.exports = router;
