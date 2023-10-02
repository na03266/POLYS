import React from 'react'
import AdminLogout from './AdminLogout';

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
        <button onClick={goRecord}>출석현황</button>
        <button onClick={golastRecord}>지난기록</button>
        <button onClick={goUserInfo}>학생별정보</button>
    </div>
  )
}

export default AdminMenu