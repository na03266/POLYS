import React, { useState } from 'react';
import './css/QRGuide.css';

function QRGuide() {
  const [modalContent, setModalContent] = useState(null);

  const guideData = {
    guide1: "출석하기 : 등록된 사용자는 출석하기 버튼을 누르고 카메라에 얼굴인식 혹은 QR코드를 스캐너에 인식시켜서 출석을 진행합니다.",
    guide2: "게스트 로그인 : 등록되지 않은 방문자는 게스트 로그인 버튼을 누르고 이후 화면의 QR코드를 통해 사용자 정보를 등록하고 게스트 로그인을 진행합니다.",
    guide3: "밥묵자 : 이번주의 식단을 확인할 수 있습니다. 원하는 날짜의 식단을 한번 더 누르면 확대해서 식단정보를 확인할 수 있습니다.",
    guide4: "관리자모드 : 관리자로 등록된 사용자는 QR코드를 인식시키면 관리자모드에 접근할 수 있습니다. 관리자모드에선 사용자 통계 및 전반적인 정보를 볼 수 있습니다."
  };
  const btnclose = () => {
    if (window.confirm('창을 닫으시겠습니까?')) {
      window.close();
    }
  }

  const openModal = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="container">
      <div className="content">
        <h1>출석부 시스템 사용가이드</h1>
        <p onClick={() => openModal('guide1')}>1. 출석하기</p>
        <p onClick={() => openModal('guide2')}>2. 게스트 로그인</p>
        <p onClick={() => openModal('guide3')}>3. 밥묵자</p>
        <p onClick={() => openModal('guide4')}>4. 관리자모드</p>
      </div>
      <p onClick={btnclose} className="close-button">닫기</p>

      {modalContent && (
        <div className="modal-background">
          <div className="modal-content">            
            <img src={`/${modalContent}.png`} alt={`Guide ${modalContent}`} style={{ maxWidth: '40%', height: 'auto' }}
            />
            <p>{guideData[modalContent]}</p>
            <p style={{fontSize:'25px'}} onClick={closeModal}>닫기</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QRGuide;
