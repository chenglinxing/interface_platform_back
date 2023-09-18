const Router = require("koa-router");
const axios = require("axios");
const dayjs = require("dayjs");
const { insertContentBeforeLastLine, useMethod } = require("../utils/file.js");
const { responseParams } = require("../utils/index.js");

const {
  createInterfaceInfo,
  isExistsInterface,
  updateInterface,
} = require("../service/interface.service");

const interfaceRouter = new Router({ prefix: "/interface" });

/**测试 */
interfaceRouter.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string1111";
});

/**创建 或更新 接口 */
interfaceRouter.post("/createInterface", async (ctx, next) => {
  const body = ctx.request?.body;
  let { isRandomData, url, method, params, mockNum, userName } = body;
  //获取当前时间
  let currentDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
  body.currentDate = currentDate;
  //先查询是否存在接口
  const isSelectExists = await isExistsInterface(body);
  console.log(isSelectExists[0].count, "isSelectExists");
  //查询到存在  则覆盖
  if (isSelectExists[0].count) {
    console.log("接口已存在");
    try {
      const updaateInterface = await updateInterface(body);
      console.log(updaateInterface.changedRows, "updaateInterface");
      ctx.body = responseParams(null,'接口参数已更新',)
    } catch (error) {
      ctx.body = responseParams(error, "接口调用失败", fals, 400);
    }
  } else {
    //创建接口
    console.log("创建");
    try {
      const isInsertInfo = await createInterfaceInfo(body);
      if (isInsertInfo.insertId) {
        //插入文件地址
        const filePath = __dirname + "/test.js";
        //生成接口文本
        let str = useMethod(url, method, params);
        //插入接口到指定路径
        await insertContentBeforeLastLine(filePath, str, 2);
        ctx.body = responseParams(null, "接口创建成功");
      }
    } catch (error) {
      ctx.body = responseParams(error, "接口创建失败", fals, 400);
    }

    // try {
    //   const filePath = __dirname + "/test.js";
    //   //生成接口文本
    //   let str = useMethod(url, method, params);
    //   //插入接口到指定路径
    //   await insertContentBeforeLastLine(filePath, str, 2);
    //   //调用插入的接口
    //   const data = await axios.post(`http://localhost:3000/test${url}`, body);
    //   ctx.body = data.data;
    // } catch (error) {
    //   console.log(error, "error");
    // }
  }
});

/**调用生成的接口 */
interfaceRouter.post("/useInterface", async (ctx, next) => { 
  const body = ctx.request?.body;
  let { isRandomData, url, method, params, mockNum, userName } = body;
  // const body = ctx.request?.body;
  // //获取当前时间
  // let currentDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
  // body.currentDate = currentDate;

  let methodStr = method == 1 ? "get" : "post";
  const data = await axios[`${methodStr}`](
    `http://localhost:3000/test${url}`,
    body
  );
  ctx.body = responseParams(data.data.data, "接口调用成功");
})
module.exports = interfaceRouter;
