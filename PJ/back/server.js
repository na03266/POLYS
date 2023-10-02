const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const adminLoginRouter = require('./routes/adminLogin'); 
app.use('/api/adminLogin', adminLoginRouter); 
const registRouter = require('./routes/regist'); 
app.use('/api/regist', registRouter);
const loginRouter = require('./routes/login'); 
app.use('/api/login', loginRouter);
const loginAttendRouter = require('./routes/loginAttend'); 
app.use('/api/loginAttend', loginAttendRouter);
const getAttendRouter = require('./routes/getAttend'); 
app.use('/api/getAttend', getAttendRouter);
const studentListRouter = require('./routes/studentList'); 
app.use('/api/studentList', studentListRouter);

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});