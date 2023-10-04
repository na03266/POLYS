import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AdminDetail() {
  const { studentID } = useParams();
  const [studentInfo, setStudentInfo] = useState({});
  const [attendanceInfo, setAttendanceInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 학생 정보를 가져오는 요청
    axios.get('http://192.168.10.157:3003/api/studentList')
      .then((response) => {
        const data = response.data.students;
        const filteredStudent = data.find((student) => student.studentID === parseInt(studentID));
        setStudentInfo(filteredStudent);
      })
      .catch((error) => {
        console.error('학생 정보를 가져오는 데 실패했습니다.', error);
        setError('학생 정보를 가져오는 데 실패했습니다.');
      });

    // 출석 정보를 가져오는 요청
    axios.get('http://192.168.10.157:3003/api/getAttend')
      .then((response) => {
        const data = response.data.attendances;
        const filteredAttendance = data.filter((item) => item.studentID === parseInt(studentID));
        setAttendanceInfo(filteredAttendance);
      })
      .catch((error) => {
        console.error('출석 정보를 가져오는 데 실패했습니다.', error);
        setError('출석 정보를 가져오는 데 실패했습니다.');
      });
  }, [studentID]);

  // 날짜 형식을 변경하는 함수
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}일`;
  };

  const goBack = () => {               
    window.location.href='/adminUserInfo';
  };

  return (
    <div>
      <button onClick={goBack}>뒤로가기</button>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h1>학생 상세 정보</h1>
          <h2>{studentInfo.studentName}</h2>
          <p>학번: {studentInfo.studentNumber}</p>
          <table>
            <thead>
              <tr>
                <th>날짜</th>
                <th>출석 여부</th>
              </tr>
            </thead>
            <tbody>
              {attendanceInfo.map((item, index) => (
                <tr key={index}>
                  <td>{formatTime(item.attendanceTime)}</td>
                  <td>
                    {item.attendanceBoolean === 0
                      ? '출석'
                      : item.attendanceBoolean === 1
                      ? '지각'
                      : item.attendanceBoolean === 2
                      ? '결석'
                      : '알 수 없음'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDetail;
