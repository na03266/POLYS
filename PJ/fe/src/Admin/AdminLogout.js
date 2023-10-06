import React, { useState } from 'react';
import './css/modal.css';

function AdminLogout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {    
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    // localStorage.removeItem('AdminID');
    localStorage.removeItem('Name');
    window.location.href = '/';
  };

  const handleCancelLogout = () => {    
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className='logoutbutton' onClick={handleLogout}>로그아웃</button>

      {/* 모달 */}
      {isModalOpen && (
        <div className="modal open">
          <p>로그아웃하시겠습니까?</p>
          <button className='modalB' onClick={handleConfirmLogout}>예</button>
          <button className='modalB' onClick={handleCancelLogout}>아니오</button>
        </div>
      )}
    </div>
  );
}

export default AdminLogout;
