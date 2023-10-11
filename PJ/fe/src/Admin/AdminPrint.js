import React, { useState } from 'react';
import { FcPrint } from 'react-icons/fc';
import './css/AdminPrint.css';
import { useReactToPrint } from 'react-to-print';

function AdminPrint(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handlePrint = useReactToPrint({
    content: () => props.printRef.current,
    documentTitle: '파일명',
  });

  const handlePrintModal = () => {
    setIsModalOpen(true);
  };

  const handleYesPrint = () => {
    setIsModalOpen(false);
    handlePrint();
  };

  const handleNoPrint = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <FcPrint className='print_bt' size={80} onClick={handlePrintModal} />
      {isModalOpen && (
        <div className="modal_print">
          <p>인쇄하시겠습니까?</p>
          <div className="button-group">
            <button className='print_y' onClick={handleYesPrint}>예</button>
            <button className='print_n' onClick={handleNoPrint}>아니오</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPrint;
