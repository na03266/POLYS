import React from 'react'

function AdminLogout() {

    const handleLogout = () => {
        // localStorage.removeItem("AdminID");
        localStorage.removeItem("Name");        
        window.location.href='/';
      };

  return (
    <div>
        <button onClick={handleLogout}>로그아웃</button>
    </div>
  )
}

export default AdminLogout