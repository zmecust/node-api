export default async (ctx, next) => {
  const res = ctx.response;
  const req = ctx.request;
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true); // 可以带cookies
  res.header('X-Powered-By', '3.2.1');
  if (req.method === 'OPTIONS') {
    ctx.throw(200);
  } else {
    next();
  }
};
