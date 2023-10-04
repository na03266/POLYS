import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Main/Home';
import Admin from './Admin/Admin';
import AdminMenu from './Admin/AdminMenu';
import AdminRecord from './Admin/AdminRecord';
import AdminLastRecord from './Admin/AdminLastRecord';
import AdminUserInfo from './Admin/AdminUserInfo';
import Regist from './Regist/Regist';
import RegistWait from './Regist/RegistWait';
import MainLogin1 from './Main/MainLogin';
import MainLogin2 from './Main/MainLogin2';
import RegistCustomizing from './Regist/RegistCustomizing';

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
        <Route path="/regist" element={<Regist />} />
        <Route path="/registWait" element={<RegistWait />} />
        <Route path="/login" element={<MainLogin1 />} />
        <Route path="/login2" element={<MainLogin2 />} />
        <Route path="/registCustomizing" element={<RegistCustomizing />} />
      </Routes>
    </Router>
  );
}

export default App;
