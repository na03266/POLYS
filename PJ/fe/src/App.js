import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Main/Home';
import Admin from './Admin/Admin';
import AdminMenu from './Admin/AdminMenu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminMenu" element={<AdminMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
