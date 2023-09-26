import React from 'react'

function AdminRecord() {
    const goBack = () => {               
        window.location.href='/adminMenu';
      };
  return (
    <div>AdminRecord
        <button onClick={goBack}>뒤로가기</button>
    </div>
  )
}

export default AdminRecord