import React from 'react'

function AdminUserInfo() {

    const goBack = () => {               
        window.location.href='/adminMenu';
      };

  return (
    <div>AdminUserInfo
        <button onClick={goBack}>뒤로가기</button>
    </div>
  )
}

export default AdminUserInfo