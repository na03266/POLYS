import React, { useState } from 'react';
import axios from 'axios';
import { BsArrowUpCircle } from 'react-icons/bs';
import './css/AdminLastRecord.css';

function AdminLastRecord() {
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

  const MoveToTop = () => {
    // top:0 >> 맨위로  behavior:smooth >> 부드럽게 이동할수 있게 설정하는 속성
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
      <div>
        <div className="adminrecord_button-group"> 
          <button className='bt_left' onClick={getAttend}>조회하기</button>
          <button className='bt_right' onClick={goBack}>뒤로가기</button>
        </div>
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
        <BsArrowUpCircle className="top_icon" size={30} onClick={MoveToTop}/> 
      </div>
    );
}

export default AdminLastRecord;
