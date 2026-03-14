import { useState } from 'react';
import { checkHeaders } from '../api/index';

const severityColor = {
  HIGH: 'text-red-400 bg-red-950 border-red-900',
  MEDIUM: 'text-yellow-400 bg-yellow-950 border-yellow-900',
  LOW: 'text-blue-400 bg-blue-950 border-blue-900',
};

const HeaderChecker = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = async () => {
    setError('');
    setResult(null);

    try {
      setLoading(true);
      const res = await checkHeaders(url);
      setResult(res.data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-black text-green-400 mb-2">🛡️ Headers Checker</h1>
      <p className="text-gray-500 text-sm mb-6">Check security headers of any website</p>

      {/* Input */}
      <div className="flex gap-3 mb-6">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 
                     text-gray-100 text-sm outline-none focus:border-green-600"
        />
        <button
          onClick={handleScan}
          disabled={loading}
          className="px-6 py-3 bg-green-500 hover:bg-green-400 disabled:bg-gray-700
                     text-gray-900 font-bold text-sm rounded-lg transition-all"
        >
          {loading ? 'Scanning...' : 'Scan →'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-950 border border-red-900 text-red-400 
                        rounded-lg px-4 py-3 text-sm mb-4">
          ⚠️ {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div>
          {/* Score */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-4 
                          flex items-center gap-5">
            <div className={`text-4xl font-black ${
              result.grade === 'A' ? 'text-green-400' :
              result.grade === 'B' ? 'text-blue-400' :
              result.grade === 'C' ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {result.grade}
            </div>
            <div>
              <div className="text-white font-bold text-xl">{result.score}%</div>
              <div className="text-gray-500 text-xs uppercase tracking-wider">
                {result.passed}/{result.total} Headers Passing
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-gray-600 text-xs">TARGET</div>
              <div className="text-gray-400 text-sm">{result.url}</div>
            </div>
          </div>

          {/* Headers List */}
          <div className="flex flex-col gap-2">
            {Object.entries(result.headers).map(([name, data]) => (
              <div
                key={name}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 border
                  ${data.present 
                    ? 'bg-gray-900 border-gray-800' 
                    : 'bg-red-950 border-red-900'}`}
              >
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  data.present ? 'bg-green-400' : 'bg-red-400'
                }`} />
                <div className="flex-1">
                  <div className="text-sm text-gray-200 font-medium">{name}</div>
                  <div className="text-xs text-gray-500">{data.description}</div>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded border ${severityColor[data.severity]}`}>
                  {data.severity}
                </span>
                <span className={`text-xs font-bold w-14 text-right ${
                  data.present ? 'text-green-400' : 'text-red-400'
                }`}>
                  {data.present ? '✓ PASS' : '✗ FAIL'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderChecker;