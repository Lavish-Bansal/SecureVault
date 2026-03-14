import { useState } from 'react';
import { checkPassword } from '../api/index';

const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  const handleCheck = async () => {
    setError('');
    setResult(null);

    try {
      setLoading(true);
      const res = await checkPassword(password);
      setResult(res.data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const strengthColor = {
    Strong: 'text-green-400',
    Medium: 'text-yellow-400',
    Weak: 'text-red-400',
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-black text-green-400 mb-2">🔑 Password Strength</h1>
      <p className="text-gray-500 text-sm mb-6">Analyze your password strength</p>

      {/* Input */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? 'text' : 'password'}
            placeholder="Enter password..."
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3
                       text-gray-100 text-sm outline-none focus:border-green-600"
          />
          <button
            onClick={() => setShow(!show)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-300 text-xs"
          >
            {show ? 'HIDE' : 'SHOW'}
          </button>
        </div>
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

      {/* Results */}
      {result && (
        <div className="flex flex-col gap-4">

          {/* Score */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center gap-5">
            <div className={`text-4xl font-black ${strengthColor[result.strength]}`}>
              {result.score}%
            </div>
            <div>
              <div className={`font-bold text-xl ${strengthColor[result.strength]}`}>
                {result.strength}
              </div>
              <div className="text-gray-500 text-xs uppercase tracking-wider">
                Password Strength
              </div>
            </div>
          </div>

          {/* Checks */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3">Checks</h3>
            <div className="flex flex-col gap-2">
              {Object.entries(result.checks).map(([check, passed]) => (
                <div key={check} className="flex items-center gap-3">
                  <span className={passed ? 'text-green-400' : 'text-red-400'}>
                    {passed ? '✓' : '✗'}
                  </span>
                  <span className="text-gray-400 text-sm capitalize">
                    {check.replace(/([A-Z])/g, ' $1')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          {result.suggestions.length > 0 && (
            <div className="bg-yellow-950 border border-yellow-900 rounded-xl p-5">
              <h3 className="text-yellow-400 text-xs uppercase tracking-wider mb-3">
                Suggestions
              </h3>
              <div className="flex flex-col gap-2">
                {result.suggestions.map((s, i) => (
                  <div key={i} className="text-yellow-300 text-sm">→ {s}</div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default PasswordChecker;