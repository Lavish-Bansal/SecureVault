const axios = require('axios');
const crypto = require('crypto');

const checkBreach = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password required' });
  }

  try {
    const sha1 = crypto.createHash('sha1')
      .update(password)
      .digest('hex')
      .toUpperCase();

    // console.log(sha1);

    const prefix = sha1.slice(0, 5);
    const suffix = sha1.slice(5);

    const response = await axios.get(
      `https://api.pwnedpasswords.com/range/${prefix}`,
      {
        headers: { 'Add-Padding': 'true' }
      }
    );

    // console.log(response);

    const lines = response.data.split('\n');
    const match = lines.find(line => 
      line.split(':')[0] === suffix
    );

    const breachCount = match 
      ? parseInt(match.split(':')[1]) 
      : 0;

    res.json({
      password: '***hidden***',
      breached: breachCount > 0,
      breachCount,
      message: breachCount > 0
        ? `Password found ${breachCount} times in data breaches!`
        : 'Password not found in any known breach!'
    });

  } catch (error) {
    res.status(500).json({ error: 'Breach check failed' });
  }
};

module.exports = { checkBreach };