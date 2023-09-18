const mysql = require("mysql2");

const connections = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  database: "interface_platform",
  user: "root",
  password: "123456",
});

//测试数据是否连接成功
connections.getConnection((err, conn) => {
  conn.connect((cerr) => {
    if (cerr) {
      console.log("数据库连接失败：", err);
    } else {
      console.log("数据库连接成功");
    }
  });
});

module.exports = connections.promise();
