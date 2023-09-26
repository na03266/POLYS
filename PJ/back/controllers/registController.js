const db = require('../db.js');

exports.regist = (req, res) => {
  const { studentNumber, studentName, studentAuthentication1, studentAuthentication2 } = req.body;

  console.log({ studentNumber, studentName, studentAuthentication1, studentAuthentication2 });

  const userQuery = 'INSERT INTO student (studentNumber, studentName, studentAuthentication1, studentAuthentication2) VALUES (?, ?, ?, ?)';
  db.query(userQuery, [studentNumber, studentName, studentAuthentication1, studentAuthentication2],
    (err, result) => {
      if (err) {
        console.error('회원가입 오류:', err);
        return res.status(500).json({ message: '회원가입 오류' });
      }

      // 회원가입 성공
      res.status(200).json({ message: '회원가입 성공' });
      console.log("회원가입 성공");
    }
  );
};
