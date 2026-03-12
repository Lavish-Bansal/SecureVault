const checkPasswordStrength = (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password required' });
  }

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    longLength: password.length >= 16,
  };

  const passed = Object.values(checks).filter(Boolean).length;
  const score = Math.round((passed / Object.keys(checks).length) * 100);

  let strength;
  if (score >= 80) strength = 'Strong';
  else if (score >= 50) strength = 'Medium';
  else strength = 'Weak';

  const suggestions = [];
  if (!checks.length) suggestions.push('Use at least 8 characters');
  if (!checks.uppercase) suggestions.push('Add uppercase letters');
  if (!checks.lowercase) suggestions.push('Add lowercase letters');
  if (!checks.number) suggestions.push('Add numbers');
  if (!checks.symbol) suggestions.push('Add special symbols');
  if (!checks.longLength) suggestions.push('Use 16+ characters for max security');

  res.json({
    password: '***hidden***',
    score,
    strength,
    checks,
    suggestions
  });
};

module.exports = { checkPasswordStrength };