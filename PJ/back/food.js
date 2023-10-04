const axios = require('axios');
const cheerio = require('cheerio');

// 웹 페이지의 URL
const url = 'https://www.kopo.ac.kr/jinju/content.do?menu=6767';

// axios를 사용하여 웹 페이지 가져오기
axios.get(url)
  .then((response) => {
    // 웹 페이지의 HTML을 Cheerio로 로드
    const $ = cheerio.load(response.data);

    // 식단 정보를 포함한 표(table) 요소를 선택합니다.
    const table = $('.tbl_table.menu');

    // 표의 데이터를 추출하여 객체에 저장합니다.
    const data = {
      days: [],
      meals: {
        breakfast: [],
        lunch: [],
        dinner: [],
      },
    };

    let currentDay = '';
    table.find('td').each((index, element) => {
      const cellText = $(element).text().trim();
      if (index % 4 === 0) {
        currentDay = cellText;
        data.days.push(currentDay);
      } else {
        data.meals[getCellHeader(index)].push(cellText);
      }
    });

    // 데이터를 JSON 형식으로 출력
    console.log(JSON.stringify(data, null, 2));
  })
  .catch((error) => {
    console.error(error);
  });

// 표의 각 셀에 해당하는 식사 정보를 반환하는 함수
function getCellHeader(index) {
  switch (index % 4) {
    case 1:
      return 'breakfast';
    case 2:
      return 'lunch';
    case 3:
      return 'dinner';
    default:
      return '';
  }
}
