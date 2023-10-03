import React from 'react';
import MainThree from './Mainthree';
import Mainthree2 from './Mainthree2';
import Mainthree3 from './Mainthree3';
import Mainthree4 from './Mainthree4';
import Mainthree5 from './Mainthree5';
 
function ThreeBox() {
  const containerStyle = {
    display: 'flex', // Flexbox 사용
    
  };

  return (
    <div style={containerStyle}>
      <MainThree />
      <Mainthree2 />
      <Mainthree3 />
      <Mainthree4 />
      <Mainthree5 />
    </div>
  );
}

export default ThreeBox;
