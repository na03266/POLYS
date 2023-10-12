import React, { useState, useEffect } from 'react';
import MainThree from './Mainthree';
import Mainthree2 from './Mainthree2';
import axios from 'axios';

function ThreeBox() {
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns
    gridGap: '10px', // Gap between items
    gridRowGap: '5px',
  };

  const itemStyle = {
    flex: '1', // Take up equal space within the grid cell
    margin: '5px', // Item margin
    textAlign: 'center',
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
      {jsonData.map((item, index) => (
        <div key={index} style={itemStyle}>
          {item.attendanceBoolean !== 2 && ( // Check if attendanceBoolean is not 2
            <>
              {item.studentGentder === 0 && <MainThree />}
              {item.studentGentder === 1 && <Mainthree2 />}
              <div style={{ fontSize: '25px' }}>{item.studentName}</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ThreeBox;
