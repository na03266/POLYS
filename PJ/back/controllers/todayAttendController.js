const db = require('../db.js');

exports.todayAttend = (req, res) => {  
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedToday = `${year}-${month}-${day}`;

  db.query(
    'SELECT attendanceID, studentID, attendanceTime, attendanceBoolean FROM attendance WHERE attendanceTime = ?',
    [formattedToday],
    (err, result) => {
      if (err) {
        console.error('불러오기 오류:', err);
        return res.status(500).json({ message: '불러오기 오류' });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: '오늘의 출석이 없습니다.' });
      }

      // 학생 정보를 불러와서 합치는 코드
      db.query(
        'SELECT studentID, studentName, studentGender FROM student',
        (studentErr, studentResult) => {
          if (studentErr) {
            console.error('학생 정보 불러오기 오류:', studentErr);
            return res.status(500).json({ message: '학생 정보 불러오기 오류' });
          }

          // 학생 정보를 학생 ID를 기준으로 매핑
          const attendanceWithStudentInfo = result.map((attendance) => {
            const student = studentResult.find((student) => student.studentID === attendance.studentID);
            return {
              attendanceID: attendance.attendanceID,
              studentID: attendance.studentID,
              attendanceTime: attendance.attendanceTime,
              attendanceBoolean: attendance.attendanceBoolean,
              studentName: student ? student.studentName : null,
               studentGentder: student.studentGender,
            };
          });

          return res.status(200).json({ attendances: attendanceWithStudentInfo });
        }
      );
    }
  );
};