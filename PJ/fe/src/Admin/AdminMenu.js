import React from 'react'
import AdminLogout from './AdminLogout';
import './css/AdminMenu.css';

function AdminMenu() {
    const Name = localStorage.getItem("Name");
    const goRecord = () => {               
        window.location.href='/adminRecord';
      };
    const golastRecord = () => {               
        window.location.href='/adminLastRecord';
      };
    const goUserInfo = () => {               
        window.location.href='/adminUserInfo';
      };    

  return (
    <div>
        <h1 className='hi'>{Name}님,<br></br> 환영합니다!</h1>
          
        <button className='menubutton' onClick={goRecord}>출석현황</button>
        <button className='menubutton' onClick={golastRecord}>지난기록</button>
        <button className='menubutton' onClick={goUserInfo}>학생별정보</button>
        <div>
          <AdminLogout/>
        </div>
    </div>
  )
}

export default AdminMenu