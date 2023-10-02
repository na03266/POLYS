import React, { useState } from 'react';
import axios from 'axios';

function AdminLastRecord() {
  const [getAttenderror, setgetAttenderror] = useState(null);
  const [jsonData, setJsonData] = useState([]);

  const getAttend = async () => {
    try {
      const response = await axios.get('http://localhost:3003/api/getAttend');

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

  // 날짜 형식을 변경하는 함수
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}일`;
  };

  const formatAttendence = (attendanceBoolean) => {
    if (attendanceBoolean === 1) {
      return '지각';
    } else if (attendanceBoolean === 0) {
      return '출석';
    } else {
      return '결석';
    }
  };


  const goBack = () => {
    window.location.href = '/adminMenu';
  };

  return (
    <div>
      <button onClick={getAttend}>조회하기</button>
      <button onClick={goBack}>뒤로가기</button>
      <div id="table-container">
        <table>
          <thead>
            <tr>
              <th>출석날짜</th>
              <th>출석여부</th>
              <th>이름</th>
            </tr>
          </thead>
          <tbody>
            {jsonData.map((item, index) => (
              <tr key={index}>
                <td>{formatTime(item.attendanceTime)}</td>
                <td>{formatAttendence(item.attendanceBoolean)}</td>
                <td>{item.studentName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminLastRecord;
