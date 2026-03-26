const isPremium = (req, res, next) => {
  if (!req.user.isPremium) {
    return res.status(403).json({
      message: 'This feature requires a Premium account. Upgrade to unlock AI Insights.',
    });
  }
  next();
};

module.exports = isPremium;
