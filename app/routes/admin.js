var express = require('express');
var router = express.Router();

var {login,admin} = require('../controllers')
/* 登录 */
router.get('/login', login.signin);
/* 后台主页 */
router.get('/main', admin.main);
module.exports = router;
