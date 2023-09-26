import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Main/Home';
import Admin from './Admin/Admin';
import AdminMenu from './Admin/AdminMenu';
import AdminRecord from './Admin/AdminRecord';
import AdminLastRecord from './Admin/AdminLastRecord';
import AdminUserInfo from './Admin/AdminUserInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminMenu" element={<AdminMenu />} />
        <Route path="/adminRecord" element={<AdminRecord />} />
        <Route path="/adminLastRecord" element={<AdminLastRecord />} />
        <Route path="/adminUserInfo" element={<AdminUserInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
