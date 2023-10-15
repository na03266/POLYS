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
import AdminDetail from './Admin/AdminDetail';
import Confirm from './Main/Confirm';
import Confirmerror from './Main/Confirmerror';
import Confirmok from './Main/Confirmok';
import GuestLogin from './Main/guestLogin';
import GuestRegist from './Main/guestRegist';
import GF from './Main/gF';
import GuestWelcome from './Main/guestWelcome';
import AdminGuest from './Admin/AdminGuest';
import HakJangNim from './Main/HakJangNim';
import QRLogin from './Main/QRLogin';

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
        <Route path="/adminDetail/:studentID" element={<AdminDetail />} />
        <Route path="/confirm" element={<Confirm />} />      
        <Route path="/confirmerror" element={<Confirmerror />} /> 
        <Route path="/confirmok" element={<Confirmok />} />   
        <Route path="/guestLogin" element={<GuestLogin />} /> 
        <Route path="/guestRegist" element={<GuestRegist />} /> 
        <Route path="/gF" element={<GF />} /> 
        <Route path="/guestWelcome" element={<GuestWelcome />} /> 
        <Route path="/AdminGuest" element={<AdminGuest />} /> 
        <Route path='/HakJangNim' element={<HakJangNim/>}/>
        <Route path='/QRLogin' element={<QRLogin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
