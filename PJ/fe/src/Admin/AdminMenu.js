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
      <h1>{Name}님 환영합니다!</h1>
      <AdminLogout/>
      <div className="button-group">
          <button onClick={goRecord}>출석 <br/ > 현황</button>
          <button onClick={golastRecord}>지난 <br/ > 기록</button>
      </div>
      <div className="button-group">
          <button onClick={goUserInfo}>학생 <br/ > 정보</button>
          <button>추가 <br/ >예정</button>
      </div>
    </div>
    );
}

export default AdminMenu