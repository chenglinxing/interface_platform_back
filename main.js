const app = require("./app");
require("./app/database");

const views = require("koa-views");
const json = require("koa-json");
const logger = require("koa-logger");

app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

let port = 3000;
app.listen(port, () => {
  console.log(`服务器${port}端口启动成功！`);
});

