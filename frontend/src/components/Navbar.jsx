import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/headers', label: 'Headers' },
  { path: '/password', label: 'Password' },
  { path: '/breach', label: 'Breach' },
  { path: '/ssl', label: 'SSL' },
  { path: '/code-review', label: 'Code Review' },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-green-400 font-bold text-xl tracking-wider">
          🔒 SecureVault
        </Link>

        {/* Nav Links */}
        <div className="flex gap-2 flex-wrap">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                location.pathname === item.path
                  ? 'bg-green-500 text-gray-900'
                  : 'text-gray-400 hover:text-green-400'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;