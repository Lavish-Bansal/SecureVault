const axios = require('axios');

const reviewCode = async (req, res) => {
  const { code, language } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Code required' });
  }

  try {
    const prompt = `
      You are a security expert. Analyze this ${language || 'code'} for security vulnerabilities.
      
      Code:
      ${code}
      
      Respond in this exact JSON format:
      {
        "vulnerabilities": [
          {
            "type": "vulnerability name",
            "severity": "HIGH/MEDIUM/LOW",
            "line": "affected code line",
            "description": "what is the issue",
            "fix": "how to fix it"
          }
        ],
        "securityScore": 0-100,
        "summary": "overall security assessment"
      }
      
      Return only JSON, no extra text.
    `;

    // console.log(code, language, prompt);

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    // console.log(response);

    const rawText = response.data.candidates[0].content.parts[0].text;
    const cleanText = rawText.replace(/```json|```/g, '').trim();
    const result = JSON.parse(cleanText);

    // console.log(result);

    res.json(result);

  } catch (error) {
    res.status(500).json({ error: 'Code review failed — ' + error.message });
  }
};

module.exports = { reviewCode };