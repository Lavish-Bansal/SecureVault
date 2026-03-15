import { useState } from 'react';
import { checkSSL } from '../api/index';

const SSLChecker = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    setError('');
    setResult(null);

    if (!url.trim()) {
      setError('Please enter a URL!');
      return;
    }

    try {
      setLoading(true);
      const res = await checkSSL(url);
      setResult(res.data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const statusColor = {
    'Valid': 'text-green-400 bg-green-950 border-green-900',
    'Expiring Soon': 'text-yellow-400 bg-yellow-950 border-yellow-900',
    'Expired': 'text-red-400 bg-red-950 border-red-900',
  };

  const statusIcon = {
    'Valid': '✅',
    'Expiring Soon': '⚠️',
    'Expired': '❌',
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-black text-green-400 mb-2">🔒 SSL Checker</h1>
      <p className="text-gray-500 text-sm mb-6">
        Verify SSL certificate validity and expiry
      </p>

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
          onClick={handleCheck}
          disabled={loading}
          className="px-6 py-3 bg-green-500 hover:bg-green-400 disabled:bg-gray-700
                     text-gray-900 font-bold text-sm rounded-lg transition-all"
        >
          {loading ? 'Checking...' : 'Check →'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-950 border border-red-900 text-red-400
                        rounded-lg px-4 py-3 text-sm mb-4">
          ⚠️ {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="flex flex-col gap-4">

          {/* Status Card */}
          <div className={`rounded-xl border p-6 text-center ${statusColor[result.status]}`}>
            <div className="text-5xl mb-3">{statusIcon[result.status]}</div>
            <div className="text-2xl font-black mb-1">{result.status}</div>
            <div className="text-sm opacity-75">{result.domain}</div>
          </div>

          {/* Details */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-4">
              Certificate Details
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Domain', value: result.domain },
                { label: 'Issuer', value: result.issuer },
                { label: 'Valid From', value: result.validFrom },
                { label: 'Valid To', value: result.validTo },
                { 
                  label: 'Days Remaining', 
                  value: result.isExpired 
                    ? 'Expired!' 
                    : `${result.daysRemaining} days`,
                  highlight: result.daysRemaining <= 30
                },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">{item.label}</span>
                  <span className={`text-sm font-medium ${
                    item.highlight ? 'text-yellow-400' : 'text-gray-200'
                  }`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default SSLChecker;