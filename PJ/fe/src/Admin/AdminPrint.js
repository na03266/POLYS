import React, { useState, useRef } from 'react';
import {FcPrint} from 'react-icons/fc';
import './css/AdminPrint.css';
import { useReactToPrint } from 'react-to-print';
import AdminRecord from './AdminRecord';
import AdminLastRecord from './AdminLastRecord';
import AdminUserInfo from './AdminUserInfo';

function AdminPrint() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const componentRef = useRef(); // 참조를 생성합니다.
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: '파일명',
  });

  const handlePrintModal = () => {
    setIsModalOpen(true);
  };

  const handleYesPrint = () => {
    setIsModalOpen(false);
    handlePrint(); // 실제 인쇄를 수행하는 함수를 호출합니다.
  };

  const handleNoPrint = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <FcPrint className='print_bt' size={80} onClick={handlePrintModal}/>
      {isModalOpen && (
        <div className="modal_print">
          <p>인쇄하시겠습니까?</p>
          <div className="button-group">
            <button className='print_y' onClick={handleYesPrint}>예</button>
            <button className='print_n' onClick={handleNoPrint}>아니오</button>
          </div>
        </div>
      )}
      {/* 이 부분은 인쇄될 내용을 렌더링하는 영역입니다. */}
      <div ref={componentRef} style={{ display: 'none' }}>
        {/* <AdminRecord />
        <AdminLastRecord />
        <AdminUserInfo /> */}
      </div>
    </div>
  );
}

export default AdminPrint;