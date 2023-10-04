// todayMenuController.js

const axios = require('axios');
const cheerio = require('cheerio');

exports.todayMenu = (req, res) => {
  // 웹 페이지의 URL
  const url = 'https://www.kopo.ac.kr/jinju/content.do?menu=6767';

  // axios를 사용하여 웹 페이지 가져오기
  axios.get(url)
    .then((response) => {
      // 웹 페이지의 HTML을 Cheerio로 로드
      const $ = cheerio.load(response.data);

      // 식단 정보를 포함한 표(table) 요소를 선택합니다.
      const table = $('.tbl_table.menu');

      // 'lunch'와 'dinner' 정보를 저장할 객체들을 생성합니다.
      const lunchData = [];
      const dinnerData = [];

      table.find('td').each((index, element) => {
        const cellText = $(element).text().trim();
        if (index % 4 === 2) {
          lunchData.push(cellText); // 'lunch' 정보를 저장
        } else if (index % 4 === 3) {
          dinnerData.push(cellText); // 'dinner' 정보를 저장
        }
      });

      // 'lunch'와 'dinner' 정보를 따로따로 JSON 형식으로 출력
      const lunchJson = JSON.stringify(lunchData, null, 2);
      const dinnerJson = JSON.stringify(dinnerData, null, 2);
      res.json({ lunch: lunchJson, dinner: dinnerJson });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: '데이터를 가져오는 중 오류가 발생했습니다.' });
    });
};
