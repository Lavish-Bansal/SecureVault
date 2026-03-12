const axios = require('axios');

const checkSecurityHeaders = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL required' });
  }

  try {
    const response = await axios.get(url);
    const headers = response.headers;

    const securityHeaders = {
      'content-security-policy': {
        present: !!headers['content-security-policy'],
        description: 'Prevents XSS attacks',
        severity: 'HIGH'
      },
      'x-frame-options': {
        present: !!headers['x-frame-options'],
        description: 'Prevents Clickjacking',
        severity: 'HIGH'
      },
      'x-content-type-options': {
        present: !!headers['x-content-type-options'],
        description: 'Prevents MIME sniffing',
        severity: 'MEDIUM'
      },
      'strict-transport-security': {
        present: !!headers['strict-transport-security'],
        description: 'Enforces HTTPS',
        severity: 'HIGH'
      },
      'referrer-policy': {
        present: !!headers['referrer-policy'],
        description: 'Controls referrer info',
        severity: 'LOW'
      },
      'permissions-policy': {
        present: !!headers['permissions-policy'],
        description: 'Controls browser features',
        severity: 'MEDIUM'
      }
    };

    const total = Object.keys(securityHeaders).length;
    const passed = Object.values(securityHeaders).filter(h => h.present).length;
    const score = Math.round((passed / total) * 100);

    let grade;
    if (score >= 80) grade = 'A';
    else if (score >= 60) grade = 'B';
    else if (score >= 40) grade = 'C';
    else grade = 'D';

    res.json({
      url,
      score,
      grade,
      headers: securityHeaders,
      passed,
      total
    });

  } catch (error) {
    res.status(500).json({ error: 'Could not fetch URL — check if URL is valid and accessible' });
  }
};

module.exports = { checkSecurityHeaders };