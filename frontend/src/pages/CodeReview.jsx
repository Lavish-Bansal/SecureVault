import { useState } from 'react';
import { reviewCode } from '../api/index';

const languages = ['javascript', 'python', 'java', 'php', 'c++', 'other'];

const severityColor = {
  HIGH: 'text-red-400 bg-red-950 border-red-900',
  MEDIUM: 'text-yellow-400 bg-yellow-950 border-yellow-900',
  LOW: 'text-blue-400 bg-blue-950 border-blue-900',
};

const CodeReview = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReview = async () => {
    setError('');
    setResult(null);

    if (!code.trim()) {
      setError('Please enter some code!');
      return;
    }

    try {
      setLoading(true);
      const res = await reviewCode(code, language);
      setResult(res.data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-black text-green-400 mb-2">🤖 AI Code Review</h1>
      <p className="text-gray-500 text-sm mb-2">
        AI powered security vulnerability detection
      </p>
      <div className="bg-yellow-950 border border-yellow-900 text-yellow-400
                      rounded-lg px-4 py-2 text-xs mb-6">
        ⚠️ Do not paste sensitive code containing API keys, passwords, or credentials!
      </div>

      {/* Language Select */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider
                        transition-all ${
              language === lang
                ? 'bg-green-500 text-gray-900'
                : 'bg-gray-900 border border-gray-700 text-gray-400 hover:text-green-400'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Code Input */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        rows={10}
        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3
                   text-gray-100 text-sm outline-none focus:border-green-600
                   font-mono mb-3 resize-none"
      />

      <button
        onClick={handleReview}
        disabled={loading}
        className="w-full py-3 bg-green-500 hover:bg-green-400 disabled:bg-gray-700
                   text-gray-900 font-bold text-sm rounded-lg transition-all mb-6"
      >
        {loading ? '🤖 Analyzing...' : 'Analyze Code →'}
      </button>

      {/* Error */}
      {error && (
        <div className="bg-red-950 border border-red-900 text-red-400
                        rounded-lg px-4 py-3 text-sm mb-4">
          ⚠️ {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="flex flex-col gap-4">

          {/* Score */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center gap-5">
            <div className={`text-4xl font-black ${
              result.securityScore >= 80 ? 'text-green-400' :
              result.securityScore >= 50 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {result.securityScore}%
            </div>
            <div>
              <div className="text-white font-bold">Security Score</div>
              <div className="text-gray-500 text-xs">{result.summary}</div>
            </div>
          </div>

          {/* Vulnerabilities */}
          {result.vulnerabilities.length === 0 ? (
            <div className="bg-green-950 border border-green-900 rounded-xl p-6 text-center">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-green-400 font-bold">No vulnerabilities found!</div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <h3 className="text-gray-400 text-xs uppercase tracking-wider">
                Vulnerabilities Found ({result.vulnerabilities.length})
              </h3>
              {result.vulnerabilities.map((vuln, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-white font-bold">{vuln.type}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${severityColor[vuln.severity]}`}>
                      {vuln.severity}
                    </span>
                  </div>
                  <div className="bg-gray-950 rounded-lg px-3 py-2 font-mono text-xs
                                  text-red-300 mb-3">
                    {vuln.line}
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{vuln.description}</p>
                  <div className="bg-green-950 border border-green-900 rounded-lg px-3 py-2">
                    <span className="text-green-400 text-xs font-bold">FIX: </span>
                    <span className="text-green-300 text-xs">{vuln.fix}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default CodeReview;