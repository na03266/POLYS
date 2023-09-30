const db = require('../db.js');

exports.login = (req, res) => {
  const { studentNumber, studentAuthentication1 } = req.body;

  db.query(
    'SELECT studentID, studentNumber, studentName FROM student WHERE studentNumber = ? AND studentAuthentication1 = ?',
    [studentNumber, studentAuthentication1],
    (err, result) => {
      if (err) {
        console.error('로그인 오류:', err);
        return res.status(500).json({ message: '로그인 오류' });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: '로그인 실패' });
      }
      
      const student = result[0]; 
      const {studentID, studentNumber, studentName } = student;
      
      res.status(200).json({ message: '로그인 성공', studentID, studentNumber, studentName });
    }
  );
};
