import React, { useState } from 'react';
import ThreeBox from './ThreeBox';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { GiBowlOfRice } from 'react-icons/gi';
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

  const moveGuest = () => {
    window.location.href = '/guestLogin';
  };

  return (
    <div>
      <Clock />
      <div className="three-container">
        <div className='modalbox' style={{display:'flex', justifyContent:'center'}}>
          <ThreeBox /> {/* MainThree 컴포넌트를 원하는 div 내에 렌더링 */}
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <button className="attendance-bt" style={{ background: 'none' }} onClick={goConfirm}>
          출석하기<MdTouchApp />
        </button>
        <div>
        <button className="guest" style={{ background: 'none' }} onClick={moveGuest}>게스트 로그인</button>
      </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p
          className="food"
          onClick={toggleModal}
          style={{ fontSize: '75px', margin: '0 20px', textAlign: 'left' }}
        >
          밥묵자<GiBowlOfRice style={{fontSize:'85px'}} />
        </p>
        <FaChalkboardTeacher
          className="admin"
          style={{ fontSize: '100px', textAlign: 'right',marginRight: '35px' }}
          onClick={goAdmin}
        />
      </div>
      {showModal && <FoodModal onClose={toggleModal} />}
    </div>
  );
}

export default Home;
