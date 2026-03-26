const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://smartspendlikeharsh.app',
    'https://money-management-harshviggggs-projects.vercel.app',
  ],
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
