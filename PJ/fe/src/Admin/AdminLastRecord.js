import React from 'react'

function AdminLastRecord() {
    const goBack = () => {               
        window.location.href='/adminMenu';
      };
  return (
    <div>AdminLastRecord
        <button onClick={goBack}>뒤로가기</button>
    </div>
  )
}

export default AdminLastRecord