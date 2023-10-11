import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/AdminUserInfo.css'

function AdminUserList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // 서버로부터 학생 목록을 가져오는 요청
    axios.get('http://192.168.10.145:3003/api/studentList')
    .then((response) => {
        // 서버에서 학생 목록을 받아온 경우
        setStudents(response.data.students); // "students" 키를 참조하여 데이터를 가져옵니다. 
    })
    .catch((error) => {
        console.error('학생 목록을 불러오는 데 실패했습니다.', error);
    });
  }, []);

  const goDetail = (studentID) => {               
    window.location.href=`/adminDetail/${studentID}`; // 해당 학생의 studentID를 포함한 경로로 이동
  };

  return (
    <div>
      <h1 className='chul'>학생 목록</h1>
      <div id="table-container" className='LRtc'>
      <table className='tablist'>
        <thead className='thelist'>
          <tr className='trlist'>
            <th className='thlist'>학번</th>
            <th className='thlist'>이름</th>            
            <th className='thlist'>수정</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentID}>              
              <td>{student.studentNumber}</td>
              <td>{student.studentName}</td>
              <td><button onClick={() => goDetail(student.studentID)} className='ect'>자세히</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default AdminUserList;
