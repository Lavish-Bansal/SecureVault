import { Link } from 'react-router-dom';

const features = [
  {
    path: '/headers',
    icon: '🛡️',
    title: 'Headers Checker',
    description: 'Check security headers of any website',
    severity: 'HIGH',
  },
  {
    path: '/password',
    icon: '🔑',
    title: 'Password Strength',
    description: 'Analyze password strength and get suggestions',
    severity: 'MEDIUM',
  },
  {
    path: '/breach',
    icon: '⚠️',
    title: 'Breach Checker',
    description: 'Check if password was in any data breach',
    severity: 'HIGH',
  },
  {
    path: '/ssl',
    icon: '🔒',
    title: 'SSL Checker',
    description: 'Verify SSL certificate validity and expiry',
    severity: 'MEDIUM',
  },
  {
    path: '/code-review',
    icon: '🤖',
    title: 'AI Code Review',
    description: 'AI powered security vulnerability detection',
    severity: 'HIGH',
  },
];

const severityColor = {
  HIGH: 'text-red-400 border-red-900 bg-red-950',
  MEDIUM: 'text-yellow-400 border-yellow-900 bg-yellow-950',
};

const Home = () => {
  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-green-400 tracking-tight mb-3">
          🔒 SecureVault
        </h1>
        <p className="text-gray-400 text-lg tracking-widest uppercase text-sm">
          Security Analysis Toolkit
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <Link
            key={feature.path}
            to={feature.path}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 
                       hover:border-green-800 hover:bg-gray-800 transition-all group"
          >
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h2 className="text-white font-bold text-lg mb-1 group-hover:text-green-400 transition-colors">
              {feature.title}
            </h2>
            <p className="text-gray-500 text-sm mb-4">{feature.description}</p>
            <span className={`text-xs font-bold px-2 py-1 rounded border ${severityColor[feature.severity]}`}>
              {feature.severity}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;