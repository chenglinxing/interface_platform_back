const connection = require("../app/database");

class InterfaceService {
  /**获取用户id */
  // async getUserId(userName) {
  //   console.log(userName, "userName");
  //   const userSql = `select user_id as userId from user_info where user_name = ?`;
  //   const userResult = await connection.execute(userSql, [userName]);
  //   let userId = userResult[0][0].userId;

  //   return userId;
  // }

  /**创建接口 */
  createInterfaceInfo = async (interfaceInfo) => {
    // console.log(interfaceInfo, "interfaceInfo");
    let { url, method, params, mockNum, currentDate, userName } = interfaceInfo;
    // //根据用户名获取用户id
    console.log(userName, "userName");
    const userSql = `select user_id as userId from user_info where user_name = ?`;
    const userResult = await connection.execute(userSql, [userName]);
    let userId = userResult[0][0].userId;
    //插入接口数据
    const statment = `insert into interface_info(user_id,interface_url,method,params,mock_num,create_time,last_update_time) values(?,?,?,?,?,?,?)`;
    const result = await connection.execute(statment, [
      userId,
      url,
      method,
      params,
      mockNum,
      currentDate,
      currentDate,
    ]);
    console.log(result[0], "rrrr");
    return result[0];
  };

  /** 根据接口名 接口路径判断是否重复（暂时未做根据用户校验）*/
  async isExistsInterface(info) {
    let { url, method, userName } = info;
    // //根据用户名获取用户id
    console.log(userName, "userName");
    const userSql = `select user_id as userId from user_info where user_name = ?`;
    const userResult = await connection.execute(userSql, [userName]);
    let userId = userResult[0][0].userId;
    const statment = `select count(*) as count from interface_info where interface_url=? and method =? and user_id`;
    const result = await connection.execute(statment, [url, method]);
    return result[0];
  }

  /**更新接口  根据接口类型、接口地址、用户名相同去更新 */
  async updateInterface(userInfo) {
    let { url, method, userName, currentDate, params, mockNum } = userInfo;
    // //根据用户名获取用户id
    const userSql = `select user_id as userId from user_info where user_name = ?`;
    const userResult = await connection.execute(userSql, [userName]);
    let userId = userResult[0][0].userId;
    let statment = `update interface_info set params = ?,mock_num = ?  where method = ? and interface_url = ? and  user_id = ?`;
    const result = await connection.execute(statment, [
      params,
      mockNum,
      method,
      url,
      userId,
    ]);
    // console.log(result, "更新接口");
    return result[0];
  }
}

module.exports = new InterfaceService();
