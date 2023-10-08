const db = require('../db.js');

exports.loginAttend = (req, res) => {
  const { studentID, attendanceTime, attendanceBoolean } = req.body;

  console.log({ studentID, attendanceTime, attendanceBoolean });

  db.query(
    'INSERT INTO todayattendance (studentID, attendanceTime, attendanceBoolean) VALUES (?, ?, ?);',
    [studentID, attendanceTime, attendanceBoolean],
    (err, result) => {
      if (err) {
        console.error('출석 오류:', err);
        return res.status(500).json({ message: '출석 오류' });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: '출석 실패' });
      }
      res.status(200).json({ message: '출석 성공'});
    }
  );
};
