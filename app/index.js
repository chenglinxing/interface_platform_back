const Koa = require("koa");

const bodyParser = require("koa-bodyparser");

//注册路由
const useRoutes = require("../routes");

// const errorHandler = require("./error-handle");

const app = new Koa();

// app.use(async (ctx, next) => {
//   ctx.set("Access-Control-Allow-Origin", "*");
//   ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
//   await next();
// });

// 定义处理跨域请求的中间件
app.use(async (ctx, next) => {
  // 设置允许跨域的源地址，这里设为允许所有
  ctx.set("Access-Control-Allow-Origin", "*");
  // 允许携带和接收客户端的 cookie
  ctx.set("Access-Control-Allow-Credentials", "true");
  // 允许的跨域请求方法
  ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  // 允许的请求头字段
  ctx.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // 处理预检请求（OPTIONS 请求）
  if (ctx.method === "OPTIONS") {
    // 返回 204 No Content，表示接受预检请求
    ctx.status = 204;
  } else {
    // 继续处理实际请求
    await next();
  }
});

app.use(bodyParser());

useRoutes(app);

// app.use(async (ctx, next) => {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });


// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
