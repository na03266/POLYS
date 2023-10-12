import React, { useState, useEffect } from 'react';
import MainThree from './Mainthree';
import Mainthree2 from './Mainthree2';
import axios from 'axios';

function ThreeBox() {
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // 3개의 열
    gridGap: '10px', // 아이템 사이의 간격
    gridRowGap: '5px',
  };

  const itemStyle = {
    margin: '5px', // 아이템 간격
    textAlign: 'center',
    border: '1px solid #ccc', // 시각적으로 나타내기 위해 테두리 추가
    padding: '10px', // 시각적으로 보기 좋게 패딩 추가
  };

  const [getAttenderror, setgetAttenderror] = useState(null);
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    getAttend();
  }, []);

  const getAttend = async () => {
    try {
      const response = await axios.get('http://192.168.10.145:3003/api/todayAttend');

      if (response.status === 200) {
        const data = response.data.attendances.filter(item => item.attendanceBoolean !== 2); // 필터링
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
      {jsonData.map((item, index) => (
        <div key={index} style={itemStyle}>
          {item.studentGentder === 0 && <MainThree />}
          {item.studentGentder === 1 && <Mainthree2 />}
          <div style={{ fontSize: '25px' }}>{item.studentName}</div>
        </div>
      ))}
    </div>
  );
}

export default ThreeBox;
