const db = require('../db.js');

exports.studentList = (req, res) => {
  db.query(
    'SELECT studentID, studentNumber, studentName FROM student',
    (err, result) => {
      if (err) {
        console.error('불러오기 오류:', err);
        return res.status(500).json({ message: '불러오기 오류' });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: '불러오기 실패' });
      }
      res.status(200).json({ students: result });
    }
  );
};