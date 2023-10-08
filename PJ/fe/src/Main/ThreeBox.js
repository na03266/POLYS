import React from 'react';
import MainThree from './Mainthree';
import Mainthree2 from './Mainthree2';

function ThreeBox() {
  const containerStyle = {
    display: 'flex', // Flexbox 사용
    
  };

  return (
    <div style={containerStyle}>
      <MainThree />
      <Mainthree2 />
    </div>
  );
}

export default ThreeBox;
