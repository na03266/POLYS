import React, { useState, useEffect } from 'react';
import MainThree from './Mainthree';
import Mainthree2 from './Mainthree2';
import Mainthree3 from './Mainthree3';
import Mainthree4 from './Mainthree4';
import Mainthree5 from './Mainthree5';
import axios from 'axios';

function ThreeBox() {
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns
    gridGap: '10px', // Gap between items
  };

  const itemStyle = {
    flex: '1', // Take up equal space within the grid cell
    margin: '5px', // Item margin
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
      const response = await axios.get('http://192.168.100.64:3003/api/todayAttend');

      if (response.status === 200) {
        const data = response.data.attendances;
        setJsonData(data);

        setShowMainThree(data.some(item => item.studentName === "이광식"));
        setShowMainThree2(data.some(item => item.studentName === "백민진"));
        setShowMainThree3(data.some(item => item.studentName === "나황제"));
        setShowMainThree4(data.some(item => item.studentName === "안진희"));
        setShowMainThree5(data.some(item => item.studentName === "전수빈"));
        console.log(data);
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
