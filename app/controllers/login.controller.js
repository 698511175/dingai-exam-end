var validate = require("../../libs/vaildate")
var {loginModel} = require("../models")
var crypto = require('crypto');
var {system} = require("../../config/index")

class login{
    /**
     * 登录页
     * @param req
     * @param res
     */
    signin(req,res){
        res.render("admin/login")
    }

    /**
     * 登录验证
     * @param req
     * @param res
     * @returns {*|Promise<any>}
     */
    checkLogin(req,res) {
        if (!validate.isRequired(req.body.username)) {
            return res.json({code: 404, msg: "用户名必填"})
        }
        if (!validate.isRequired(req.body.password)) {
            return res.json({code: 404, msg: "密码必填"})
        }
        var {username, password} = req.body;
        var hmac = crypto.createHmac('sha1',system.salt_secret);
        hmac.update(password);
        password = hmac.digest("hex");
        loginModel.getUser(username,function (err,users) {
            if (err){
                next(err)
            }else {
                if (users) {
                    if (password == users[0].password) {
                        req.session.isLogin = true;
                        req.session.username = username;
                        res.json({code: 200, msg: "登录成功", data: {url: '/admin/main'}})
                    }else {
                        res.json({code: 404, msg: "账号或密码错误"})
                    }
                } else {
                    res.json({code: 404, msg: "用户名错误"})
                }
            }
        })
    }

    /**
     * 登出操作
     * @param req
     * @param res
     */
    loginOut(req,res){
        req.session.destroy();
        res.redirect("/admin/login")
    }

    /**
     * 修改密码页面
     * @param req
     * @param res
     */
    changePass(req,res){
        res.render("admin/changePass",{username:req.session.username})
    }

    /**
     * 修改密码操作
     * @param req
     * @param res
     * @returns {*|Promise<any>}
     */
    changePassDone(req,res){
        if (!validate.isRequired(req.body.password)) {
            return res.json({code: 404, msg: "原密码必填"})
        }
        if (!validate.isRequired(req.body.newPass)) {
            return res.json({code: 404, msg: "新密码必填"})
        }
        if (!validate.isRequired(req.body.newPassCheck)) {
            return res.json({code: 404, msg: "确认新密码必填"})
        }
        if (!(req.body.newPass === req.body.newPassCheck)){
            return res.json({code: 404, msg: "两次密码不一致"})
        }
        var data = {
            username : req.body.username,
            password : req.body.password,
            newPass : req.body.newPass
        }
        // 加密原密码
        // 18cf7ba05087697e719c1dd85923862f588c6603
        var hmac = crypto.createHmac('sha1',system.salt_secret);
        hmac.update(data.password);
        data.password = hmac.digest("hex");
        // // 加密新密码
        hmac = crypto.createHmac('sha1',system.salt_secret);
        hmac.update(data.newPass);
        data.newPass = hmac.digest("hex");

        loginModel.changePass(data,function (err,result) {
            res.json(result)
        })
    }
}
module.exports = new login()