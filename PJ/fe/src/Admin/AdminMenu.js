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
    const goAdminGuest = () =>{
        window.location.href='/adminGuest';
      };

  return (
    <div>
        <h1 className='hi'>{Name}님<br></br> 환영합니다!</h1>
            <div className='menubutton-container'>
            <button className='menubutton1' onClick={goRecord}>출석현황</button>
            <button className='menubutton1' onClick={golastRecord}>지난기록</button>
              <br></br>
            <button className='menubutton2' onClick={goUserInfo}>학생별정보</button>
            <button className='menubutton2' onClick={goAdminGuest}>방문기록</button>
            </div>
        <div className='logout-container'>
        <AdminLogout/>
        </div>
      </div>
  )
}

export default AdminMenu