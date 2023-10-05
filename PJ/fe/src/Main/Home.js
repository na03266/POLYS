import React, { useState } from 'react';
import ThreeBox from './ThreeBox';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { PiBowlFoodFill } from 'react-icons/pi';
import { MdTouchApp } from 'react-icons/md';
import Clock from './Clock';
import FoodModal from './foodmodal';
import './css/Home.css';

function Home() {
  const goAdmin = () => {
    window.location.href = '/admin';
  };
  const goConfirm = () => {
    window.location.href = '/confirm';
  };
  const [showModal, setShowModal] = useState(false);

  // 모달을 열고 닫는 함수
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <Clock />
      <div className="three-container">
        <ThreeBox /> {/* MainThree 컴포넌트를 원하는 div 내에 렌더링 */}
      </div>
      <div style={{ textAlign: 'center' }}>
        <button className="attendance-bt" style={{ background: 'none' }} onClick={goConfirm}>
          출석하기<MdTouchApp />
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p
          onClick={toggleModal}
          style={{ fontSize: '75px', margin: '0 20px', textAlign: 'left' }}
        >
          식단정보<PiBowlFoodFill />
        </p>
        <FaChalkboardTeacher
          style={{ fontSize: '75px', textAlign: 'right' }}
          onClick={goAdmin}
        />
      </div>
      {showModal && <FoodModal onClose={toggleModal} />}
    </div>
  );
}

export default Home;
