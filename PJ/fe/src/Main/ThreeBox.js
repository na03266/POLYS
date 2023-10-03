import React, { useState } from 'react';
import MainThree from './Mainthree';
import Mainthree2 from './Mainthree2';
import Mainthree3 from './Mainthree3';
import Mainthree4 from './Mainthree4';
import Mainthree5 from './Mainthree5';
import axios from 'axios';
 
function ThreeBox() {
  const containerStyle = {
    display: 'flex', // Flexbox 사용
    
  };
  // 정보를 가져오는 부분
  const [getAttenderror, setgetAttenderror] = useState(null);
  const [jsonData, setJsonData] = useState([]);
  

  const getAttend = async () => {
    try {
      const response = await axios.get('http://192.168.10.157:3003/api/getAttend');

      if (response.status === 200) {
        const data = response.data.attendances;
        setJsonData(data);
      } else {
        const errorData = response.data;
        setgetAttenderror(errorData.message || '가져오기 실패');
      }
    } catch (error) {
      console.error('가져오기 오류', error);
      setgetAttenderror('가져오기 중 오류가 발생했습니다.');
    }
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
