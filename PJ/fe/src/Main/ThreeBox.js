import React, { useState, useEffect } from 'react';
import MainThree from './Mainthree';
import Mainthree2 from './Mainthree2';
import Mainthree3 from './Mainthree3';
import Mainthree4 from './Mainthree4';
import Mainthree5 from './Mainthree5';
import axios from 'axios';

function ThreeBox() {
  const containerStyle = {
    display: 'flex',
  };

  const itemStyle = {
    flex: 'calc(33.33% - 10px)', // 열은 3개, 간격을 고려하여 33.33%로 설정
    margin: '5px', // 아이템 간 간격
  };

  const [getAttenderror, setgetAttenderror] = useState(null);
  const [jsonData, setJsonData] = useState([]);
  const [showMainThree, setShowMainThree] = useState(false);
  const [showMainThree2, setShowMainThree2] = useState(false);
  const [showMainThree3, setShowMainThree3] = useState(false);
  const [showMainThree4, setShowMainThree4] = useState(false);
  const [showMainThree5, setShowMainThree5] = useState(false);

  useEffect(() => {
    getAttend();
  }, []);

  const getAttend = async () => {
    try {
      const response = await axios.get('http://192.168.10.157:3003/api/todayAttend');

      if (response.status === 200) {
        const data = response.data.attendances;
        setJsonData(data);

        const found1 = data.some(item => item.studentName === "이광식");
        setShowMainThree(found1);

        const found2 = data.some(item => item.studentName === "백민진");
        setShowMainThree2(found2);

        const found3 = data.some(item => item.studentName === "나황제");
        setShowMainThree3(found3);

        const found4 = data.some(item => item.studentName === "안진희");
        setShowMainThree4(found4);

        const found5 = data.some(item => item.studentName === "전수빈");
        setShowMainThree5(found5);
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
      <div style={itemStyle}>
        {showMainThree && <MainThree />}
      </div>
      <div style={itemStyle}>
        {showMainThree2 && <Mainthree2 />}
      </div>
      <div style={itemStyle}>
        {showMainThree3 && <Mainthree3 />} 
      </div>
      <div style={itemStyle}>
        {showMainThree4 && <Mainthree4 />} 
      </div>
      <div style={itemStyle}>
        {showMainThree5 && <Mainthree5 />}
      </div>
    </div>
  );
}

export default ThreeBox;
