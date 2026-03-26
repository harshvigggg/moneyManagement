const { GoogleGenerativeAI } = require('@google/generative-ai');

const getSpendingInsights = async (transactions) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const summary = transactions.map((t) => ({
    type: t.type,
    amount: t.amount,
    category: t.category,
    date: new Date(t.date).toISOString().split('T')[0],
  }));

  const prompt = `
You are a personal finance advisor. Analyze these transactions from the last 30 days and respond ONLY with valid JSON in this exact format (no markdown, no explanation, just raw JSON):

{
  "overview": "2-3 sentence summary of overall financial health",
  "topCategories": [
    { "category": "CategoryName", "amount": 1234, "insight": "brief insight about this spending" }
  ],
  "overspendingWarnings": ["warning 1", "warning 2"],
  "savingsTips": ["tip 1", "tip 2", "tip 3"],
  "budgetRecommendation": "Concrete monthly budget suggestion in 2-3 sentences"
}

Transaction data (amounts in INR):
${JSON.stringify(summary)}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Strip any markdown code fences Gemini may add
  const cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
  return JSON.parse(cleaned);
};

module.exports = { getSpendingInsights };
