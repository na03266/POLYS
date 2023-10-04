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

    // 'lunch'와 'dinner' 정보만을 저장할 객체를 생성합니다.
    const meals = {
      lunch: [],
      dinner: [],
    };

    table.find('td').each((index, element) => {
      const cellText = $(element).text().trim();
      if (index % 4 === 2) {
        meals.lunch.push(cellText); // 'lunch' 정보만 저장
      } else if (index % 4 === 3) {
        meals.dinner.push(cellText); // 'dinner' 정보만 저장
      }
    });

    // 데이터를 JSON 형식으로 출력
    console.log(JSON.stringify(meals, null, 2));
  })
  .catch((error) => {
    console.error(error);
  });
