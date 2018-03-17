import express from 'express';
import connectMongo from 'connect-mongo';
import * as config from './config/default';
import router from './routes/index.js';
import db from './mongodb/db.js'; //连接数据库
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import compress from 'compression';
import requestLog from './middlewares/request_log';

const app = express();

//通用中间件
app.use(requestLog); // Request logger 请求时间
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(compress());

app.set('jwtTokenSecret', config.jwt_secret);

//跨域
app.all('*', (req, res, next) => {
  req.jwtTokenSecret = app.get('jwtTokenSecret');
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", '3.2.1')
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

//设置session
// const MongoStore = connectMongo(session); //session的持久化, 把会话信息存储在mongodb中
// app.use(cookieParser());
// app.use(session({
//   name: config.session.name,
//   secret: config.session.secret,
//   resave: true,
//   saveUninitialized: false,
//   cookie: config.session.cookie,
//   store: new MongoStore({
//     url: config.url,
//   })
// }))

router(app);

// app.use(express.static('./public'));
app.listen(config.port);
