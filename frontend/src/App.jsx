import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import HeadersChecker from './pages/HeaderChecker';
import PasswordChecker from './pages/PasswordChecker';
import BreachChecker from './pages/BreachChecker';
import SSLChecker from './pages/SslChecker';
import CodeReview from './pages/CodeReview';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <Navbar />
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/headers" element={<HeadersChecker />} />
            <Route path="/password" element={<PasswordChecker />} />
            <Route path="/breach" element={<BreachChecker />} />
            <Route path="/ssl" element={<SSLChecker />} />
            <Route path="/code-review" element={<CodeReview />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;