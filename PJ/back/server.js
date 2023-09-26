const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const adminLoginRouter = require('./routes/adminLogin'); 
app.use('/api/adminLogin', adminLoginRouter); 

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});