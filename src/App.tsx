import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Problems from './pages/Problems';
import SolLogs from './pages/SolLogs';
import Labs from './pages/Labs';
import WorksCited from './pages/WorksCited';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/sols" element={<SolLogs />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/works" element={<WorksCited />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
