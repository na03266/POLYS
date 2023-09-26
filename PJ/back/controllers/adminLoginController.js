const db = require('../db.js');

exports.adminLogin = (req, res) => {
  const { Password } = req.body;

  console.log({ Password });

  db.query(
    'SELECT AdminID, Name FROM admins WHERE Password = ?',
    [Password],
    (err, result) => {
      if (err) {
        console.error('로그인 오류:', err);
        return res.status(500).json({ message: '로그인 오류' });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: '로그인 실패' });
      }

      // 로그인 성공
      const admin = result[0]; // 결과 배열의 첫 번째 항목을 사용
      const { AdminID, Name } = admin;
      console.log({ Name, AdminID });

      res.status(200).json({ message: '로그인 성공', AdminID, Name });
    }
  );
};
