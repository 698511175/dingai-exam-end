var express = require('express');
var router = express.Router();
var {isLogin,isLogin_main} = require('../../libs/util')
var {login,admin,topic,users,paper,score} = require('../controllers')
/* 登录 */
router.route('/login')
    .get(isLogin_main,login.signin)
    .post(login.checkLogin)
// 退出登录
router.get("/loginout",login.loginOut);
/* 后台主页 */
router.get('/main',isLogin,admin.main);
// 修改密码
router.route('/changePass')
    .get(login.changePass)
    .put(login.changePassDone)
// 题库分类 /admin/classify
router.get('/classify',admin.classify)
// 获取题库分类
router.get('/getClassify',admin.getClassify)
// 添加题库分类
router.route('/addClassify')
    .get(admin.addClassify)
    .post(admin.addClassifyDone)
// 更新题库分类
router.route('/editClassify')
    .get(admin.showEditClassify)
    .put(admin.editClassify)
// 删除分类
router.delete("/delClassify",admin.delClassify)
// 试题列表页
router.get("/topic",topic.showTopic)
// 获取试题列表
router.get("/getTopic",topic.getTopic)
// 更新试题
router.route("/editTopic")
    .get(topic.showEditTopic)
    .put(topic.editTopic)
// 添加试题
router.route("/addTopic")
    .get(topic.addTopic)
    .post(topic.addTopicDone)
// 删除试题
router.delete("/delTopic",topic.delTopic)
// 用户分类页
router.get("/usersClassify",users.showUsersClassify)
// 获取用户分类
router.get("/getUsersClassify",users.getUsersClassify)
// 添加用户分类
router.route('/addUsersClassify')
    .get(users.addUsersClassify)
    .post(users.addUsersClassifyDone)
// 用户列表页
router.get("/users",users.showUsers)
// 获取用户列表
router.get("/getUsers",users.getUsers)
// 添加用户
router.route('/addUsers')
    .get(users.addUsers)
    .post(users.addUsersDone)
// 创建试卷
router.route("/addPaper")
    .get(paper.addPaper)
    .post(paper.addPaperDone)
// 试卷列表页
router.get("/paper",paper.showPaper)
// 成绩列表页
router.get("/score",score.showScore)
// 获取成绩列表信息
router.get("/getScore",score.getScore)
module.exports = router;