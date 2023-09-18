const Router = require("koa-router");

const userRouter = new Router({ prefix: "/user" });

userRouter.get("/", function (ctx, next) {
  ctx.body = "this is a users response!";
});

userRouter.get("/bar", function (ctx, next) {
  ctx.body = "this is a users/bar response";
});

module.exports = userRouter;
