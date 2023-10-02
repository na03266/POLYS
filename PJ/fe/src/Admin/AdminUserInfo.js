import React from 'react'
import AdminUserList from './AdminUserList';
import FaceDetectionApp from './FaceDetectionApp';

function AdminUserInfo() {

    const goBack = () => {               
        window.location.href='/adminMenu';
      };

  return (
    <div>
        <button onClick={goBack}>뒤로가기</button><br></br>
        <AdminUserList/>
        <FaceDetectionApp/>
    </div>
  )
}

export default AdminUserInfo