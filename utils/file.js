const fs = require("fs");

/**
 * 在文本文件的倒数第二行处插入内容
 * @param {*} filePath 实际的文件路径
 * @param {*} content 要插入的实际内容
 * @param {number} lastIndex 倒数第几行插入
 */
const insertContentBeforeLastLine = async (
  filePath,
  content,
  lastIndex = 2
) => {
  try {
    // 读取文件内容
    const fileContent = fs.readFileSync(filePath, "utf-8").split("\n");

    // 在倒数第二行之前插入内容
    const insertIndex = fileContent.length - lastIndex;
    fileContent.splice(insertIndex, 0, content);

    // 将内容写回文件
    fs.writeFileSync(filePath, fileContent.join("\n"));
    console.log("成功在倒数第二行插入内容。");

    return true;
  } catch (err) {
    console.error("无法在倒数第二行插入内容。", err);

    return false;
  }
};

/**
 * 指定返回的请求插入到文件中
 * @param {*} url  请求路径
 * @param {get|post|delete|patch} method  请求类型
 * @param {*} data
 */
const useMethod = (url, method, data) => {
  let res = null;
  switch (method) {
    case 1:
      let str1 = `testRouter.get('${url}', async (ctx, next) => {
         let query = ctx.query
        ctx.body = {data:${data},status:200,msg:null};
      });`;
      res = str1;
      break;
    case 2:
      let str2 = `testRouter.post('${url}', async (ctx, next) => {
          let body = ctx.request.body;
          ctx.body ={data:${data},status:200,msg:null};
        });
      `;

      res = str2;
      break;
    case 3:
      let str3 = `testRouter.get('${url}', async (ctx, next) => {
         let query = ctx.query
        ctx.body = {data:${data},status:200,msg:null};
      });`;
      res = str3;
      break;
    default:
      break;
  }
  return res;
};

module.exports = { insertContentBeforeLastLine, useMethod };
