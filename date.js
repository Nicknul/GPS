window.addEventListener('load', () => {
  const root = document.getElementById('root'); // document
  const now = new Date(); // date 생성 함수

  let year = now.getFullYear();
  let month = (now.getMonth() + 1).toString();
  let date = now.getDate().toString();

  let a = new Date('2024-09-04');
  let day = a.getDay(); // 요일 index
  let dayArr = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  let days = dayArr[day];
  console.log(days);

  if (month.length < 2) {
    month = '0' + month;
  }
  if (date.length < 2) {
    date = '0' + date;
  }

  const processDate = year + month + date;
  const transformDate = Number(processDate);
  console.log(transformDate);

  const key = 'n8uIBadsqMx4UqYvGKL7l7l2Gkut99sQyvUHXQJdNhOo0pQQRE0vwEgMMYsptCZ91a4L%2Fna8hWLVrGmNkOQS5w%3D%3D';
  const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${key}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${processDate}&base_time=0200&nx=67&ny=100`;

  async function shortWeather() {
    let a = await fetch(url, { method: 'GET' });
    let b = await a.json();

    const data = b.response.body.items.item; // 단기예보 데이터

    for (let i = 0; i < data.length; i++) {
      let category = data[i].category; // 날씨 분류 : 1시간 기상, 최고 기온, 최저 기온 등
      let date = data[i].fcstDate; // api 데이터에 있는 날짜

      /**
       * ? 명세서
       * TMP : 1시간별 기온
       * TMX : 최고 기온
       * TMN : 최저 기온
       * category : 분류
       * fcstDate : 날짜
       * fcstTime : 일시
       * fcstValue : 분류 값
       */
      // todo-1 최고 기온
      if (category === 'TMX') {
        for (let j = 0; j <= 3; j++) {
          if (date === `${transformDate + j}`) {
            let temperature = data[i].fcstValue;
            let a = `최고 온도:${temperature}`;
            console.log(a);
          }
        }
      }

      // todo-2 최저 기온
      if (category === 'TMN') {
        for (let j = 0; j <= 3; j++) {
          if (date === `${transformDate + j}`) {
            let temperature = data[i].fcstValue;
            let a = `최저 온도:${temperature}`;
            console.log(a);
          }
        }
      }
    }
  }
  shortWeather();
});
