import express from 'express';
import connectMongo from 'connect-mongo';
import * as config from './config/default';
import router from './routes/index.js';
import db from './mongodb/db.js';

const app = express();

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", '3.2.1')
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

//const MongoStore = connectMongo();
// app.use(cookieParser());

router(app);

// app.use(express.static('./public'));
app.listen(config.port);