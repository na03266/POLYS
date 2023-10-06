import React from 'react'
import AdminUserList from './AdminUserList';
import './css/AdminUserInfo.css';

function AdminUserInfo() {

    const goBack = () => {               
        window.location.href='/adminMenu';
      };

  return (
    <div>
        <AdminUserList/>
        <div>
          <button className='backBu' onClick={goBack}>뒤로가기</button>
        </div>
    </div>
  )
}

export default AdminUserInfo