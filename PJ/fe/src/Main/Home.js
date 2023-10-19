// Home 컴포넌트

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
    const element = document.querySelector('.home-container');
    if (element) {
      element.classList.add('slide-out-left');
    }
    setTimeout(() => {
    window.location.href = '/admin';
    },200);
  };

  const goConfirm = () => {
    const element = document.querySelector('.home-container');
    if (element) {
      element.classList.add('slide-out-left');
    }
    setTimeout(() => {
      window.location.href = '/confirm';
    }, 200);
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const moveGuest = () => {
    const element = document.querySelector('.home-container');
    if (element) {
      element.classList.add('slide-out-left');
    }
    setTimeout(() => {
    window.location.href = '/guestLogin';
    },200);
  };

  return (
    <div className="home-container">
      <Clock />
      <div className="three-container">
        <div className="modalbox" style={{ display: 'flex', justifyContent: 'center' }}>
          <ThreeBox />
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <button className="attendance-bt" style={{ background: 'none' }} onClick={goConfirm}>
          출석하기<MdTouchApp />
        </button>
        <div>
          <button className="guest" style={{ background: 'none' }} onClick={moveGuest}>
            게스트 로그인
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <p
        className="food modal-animation" // 모달 애니메이션 클래스 추가
        onClick={toggleModal}
        style={{ fontSize: '75px', margin: '0 20px', textAlign: 'left' }}
      >
        밥묵자<GiBowlOfRice style={{ fontSize: '85px' }} />
      </p>
        <FaChalkboardTeacher
          className="admin"
          style={{ fontSize: '100px', textAlign: 'right', marginRight: '35px' }}
          onClick={goAdmin}
        />
      </div>
      {showModal && <FoodModal onClose={toggleModal} />}
    </div>
  );
}

export default Home;
