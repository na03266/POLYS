import React, { useState } from 'react';
import axios from 'axios';

function AdminGuest() {
  const [getGuesterror, setgetGuesterror] = useState(null);
  const [jsonData, setJsonData] = useState([]);

  const getGuest = async () => {
    try {
      const response = await axios.get('http://192.168.10.145:3003/api/getGuest');

      if (response.status === 200) {
        const data = response.data.guests;
        setJsonData(data);        
      } else {
        const errorData = response.data;
        setgetGuesterror(errorData.message || '가져오기 실패');
      }
    } catch (error) {
      console.error('가져오기 오류', error);
      setgetGuesterror('가져오기 중 오류가 발생했습니다.');
    }
  };

  const goBack = () => {
    window.location.href = '/adminMenu';
  };

  return (
    <div>
      <h1 className='chul'>방문기록</h1>
      <div id="table-container" className='LRtc'>
        <table className='LRtab'>
          <thead className='LRthe'>
            <tr className='LRtr'>
              <th className='LRth'>이름</th>
              <th className='LRth'>방문목적</th>              
            </tr>
          </thead>
          <tbody>
            {jsonData.map((item, index) => (
              <tr key={index}>
                <td>{(item.guestName)}</td>
                <td>{(item.guestPurpose)}</td>                
              </tr>
            ))}
          </tbody>
        </table>
      <button className='joeB' onClick={getGuest}>조회하기</button>
      <button className='backB' onClick={goBack}>뒤로가기</button>
      </div>
    </div>
  );
}

export default AdminGuest