import React from 'react'
import AdminUserList from './AdminUserList';


function AdminUserInfo() {

    const goBack = () => {               
        window.location.href='/adminMenu';
      };

  return (
    <div>
        <button onClick={goBack}>뒤로가기</button><br></br>
        <AdminUserList/>
        
    </div>
  )
}

export default AdminUserInfo