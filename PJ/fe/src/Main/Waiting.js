import React from 'react';
import Clock from './Clock';

function Waiting() {
  const goToHomePage = () => {
    window.location.href = '/home';
  };

  return (
    <div>
      {/* style={{backgroundColor:'#0CBFF2', minHeight:'150vh'}} */}
      <div onClick={goToHomePage}>
        <Clock />
        <img src={'/pol.png'} style={{ maxWidth: '40%', height: 'auto', marginLeft: '30%' }} />
        <h1 style={{ textAlign: 'center', marginTop: '5%' }}>AI소프트웨어 출석부시스템</h1>
        <img src={'/QRGuide.png'} style={{ maxWidth: '40%', height: 'auto', marginLeft: '30%' }} />
        <h1 style={{ textAlign: 'center', marginTop: '5%' }}>가이드</h1>
        <h1 style={{ textAlign: 'center'}}>QR코드를 이용하기 위해서는<br></br>Ai_5G 와이파이에 연결해주세요<br></br><br></br>
          WIFI : Ai_5G<br></br>
          PW : 000000AI
        </h1>
      </div>
    </div>
  );
}

export default Waiting;
