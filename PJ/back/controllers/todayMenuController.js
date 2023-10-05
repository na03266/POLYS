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

      // 'menuData' 객체 배열을 생성하여 데이터를 저장
      const menuData = [];

      // 식단 정보가 있는 테이블을 선택
      const table = $('table.tbl_table.menu');

      // 각 행을 순회하며 데이터 추출
      table.find('tbody tr').each((index, row) => {
        const tds = $(row).find('td');

        // 날짜와 식사 구분 추출
        const dateScript = tds.eq(0).find('script').text().trim();
        const date = extractDate(dateScript); // 날짜 파싱 함수로 변경
        const mealType = tds.eq(3).find('span').text().trim();
        const menu = tds.eq(2).find('span').text().trim();

        // 토요일과 일요일 데이터는 제외하고 추가
        if (date !== '토요일' && date !== '일요일') {
          // 날짜를 가공하여 "10월 7일 금요일" 형식으로 변환
          const formattedDate = formatDate(date);

          // 날짜와 식사 구분을 가지고 있는 객체 생성 및 추가
          const menuEntry = {
            date: formattedDate,
            mealType: mealType,
            menu: menu,
          };

          menuData.push(menuEntry);
        }
      });

      // 클라이언트로 JSON 형식으로 데이터 전달
      res.json({ menu: menuData });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: '데이터를 가져오는 중 오류가 발생했습니다.' });
    });
};

// 날짜 파싱 함수
function extractDate(dateString) {
  const match = dateString.match(/(\d{4}-\d{2}-\d{2})/);
  if (match) {
    return match[1];
  }
  return dateString; // 파싱에 실패하면 그대로 반환
}

// 날짜를 "10월 7일 금요일" 형식으로 가공하는 함수
function formatDate(dateString) {
  const date = new Date(dateString);
  if (!isNaN(date)) {
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
    const day = date.getDate();
    const dayOfWeek = date.toLocaleDateString('ko-KR', { weekday: 'long' });

    return `${month}월 ${day}일 ${dayOfWeek}`;
  } else {
    return dateString; // 날짜 파싱에 실패한 경우 그대로 반환
  }
}
