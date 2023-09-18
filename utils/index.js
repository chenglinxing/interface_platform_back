/*
    fn： promise
    params: fn的参数
    times: 需要重复发起请求的次数
*/
const interfaceRetry = (fn, params, times = 2) => {
  return new Promise(async (resolve, reject) => {
    while (times--) {
      try {
        const res = await fn(params);
        resolve(res);
        break;
      } catch (error) {
        if (times <= 0) {
          reject(error);
        }
      }
    }
  });
};

/**
 * 响应参数
 * @param {*} data
 * @param {string} msg
 * @param {boolean} success
 * @param {number} status
 * @returns
 */
const responseParams = (data, msg, success = true, status = 200) => {
  return {
    data,
    msg,
    success,
    status,
  };
};

module.exports = { interfaceRetry, responseParams };
