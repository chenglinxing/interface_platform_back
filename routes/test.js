const Router = require("koa-router");

const testRouter = new Router({ prefix: "/test" });

      
testRouter.get('/user/getUserInfo112', async (ctx, next) => {
         let query = ctx.query
        ctx.body = {data:[{"name":"何超","age":41,"address":"薛敏"},{"name":"马涛","age":34,"address":"冯强"},{"name":"薛丽","age":23,"address":"戴磊"},{"name":"顾秀兰","age":18,"address":"何明"},{"name":"刘平","age":33,"address":"胡霞"},{"name":"杨洋","age":49,"address":"康涛"},{"name":"魏磊","age":21,"address":"董艳"},{"name":"徐勇","age":23,"address":"马磊"},{"name":"孔涛","age":21,"address":"李霞"},{"name":"邱勇","age":44,"address":"郭明"},{"name":"孙静","age":41,"address":"方敏"},{"name":"田静","age":21,"address":"曾艳"}],status:200,msg:null};
      });
module.exports = testRouter;
