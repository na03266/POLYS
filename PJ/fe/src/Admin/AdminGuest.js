import React, { useState } from 'react';
import axios from 'axios';
import './css/AdminGuest.css'

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
      <h1 className='Bang'>방문기록</h1>
      <div id="table-container1" className='LRtc1'>
        <table className='LRtab1'>
          <thead className='LRthe1'>
            <tr className='LRtr1'>
              <th className='LRth1'>이름</th>
              <th className='LRth1'>방문목적</th>              
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
      </div>
      <button className='joeB1' onClick={getGuest}>조회하기</button>
      <button className='backB1' onClick={goBack}>뒤로가기</button>
    </div>
  );
}

export default AdminGuest