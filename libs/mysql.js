var mysql = require('mysql');    // 加载mysql模块
var {database} = require('../config/index')
var connection = mysql.createConnection(database)
module.exports = connection;