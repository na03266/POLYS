const db = require('../db.js');

exports.guestLogin = (req, res) => {
  const { guestName, guestPurpose } = req.body;

  console.log({ guestName, guestPurpose });

  db.query(
    'INSERT INTO guest (guestName, guestPurpose) VALUES (?, ?)',
    [guestName, guestPurpose],
    (err, result) => {
      if (err) {
        // 오류 처리
        console.error('데이터베이스 오류:', err);
        return res.status(500).json({ error: '데이터베이스 오류' });
      }

      // 데이터베이스 삽입이 성공한 경우
      const response = {
        guestName: guestName, // guestName을 응답 데이터에 포함
        guestPurpose: guestPurpose,
        message: '등록 성공',
      };

      res.status(200).json(response); // 클라이언트로 응답을 보냄
    }
  );
};