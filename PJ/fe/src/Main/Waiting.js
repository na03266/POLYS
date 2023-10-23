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
        <h1 style={{ textAlign: 'center', marginTop: '5%' }}>출석부시스템 바로가기</h1>
        <img src={'/QRGuide.png'} style={{ maxWidth: '40%', height: 'auto', marginLeft: '30%' }} />
        <h1 style={{ textAlign: 'center', marginTop: '5%' }}>가이드</h1>
      </div>
    </div>
  );
}

export default Waiting;
