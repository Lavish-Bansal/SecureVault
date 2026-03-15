import { useState } from 'react';
import { checkBreach } from '../api/index';

const BreachChecker = () => {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  const handleCheck = async () => {
    setError('');
    setResult(null);

    if (!password.trim()) {
      setError('Please enter a password!');
      return;
    }

    try {
      setLoading(true);
      const res = await checkBreach(password);
      setResult(res.data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-black text-green-400 mb-2">⚠️ Breach Checker</h1>
      <p className="text-gray-500 text-sm mb-2">
        Check if your password appeared in any data breach
      </p>
      <div className="bg-blue-950 border border-blue-900 text-blue-400 
                      rounded-lg px-4 py-2 text-xs mb-6">
        🔒 Your password is never sent directly — we use k-anonymity for privacy!
      </div>

      {/* Input */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? 'text' : 'password'}
            placeholder="Enter password to check..."
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

      {/* Result */}
      {result && (
        <div className={`rounded-xl border p-6 text-center ${
          result.breached
            ? 'bg-red-950 border-red-900'
            : 'bg-green-950 border-green-900'
        }`}>
          <div className="text-5xl mb-3">
            {result.breached ? '🚨' : '✅'}
          </div>
          <div className={`text-xl font-black mb-2 ${
            result.breached ? 'text-red-400' : 'text-green-400'
          }`}>
            {result.breached ? 'BREACHED!' : 'SAFE!'}
          </div>
          <div className={`text-sm ${
            result.breached ? 'text-red-300' : 'text-green-300'
          }`}>
            {result.message}
          </div>
          {result.breached && (
            <div className="mt-4 text-red-400 text-xs uppercase tracking-wider">
              Found {result.breachCount.toLocaleString()} times in data breaches
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BreachChecker;