var {usersModel} = require("../models");
var validate = require("../../libs/vaildate")
var crypto = require('crypto');
var {system} = require("../../config/index")

class users{
    /**
     * 用户分类页
     * @param req
     * @param res
     */
    showUsersClassify(req,res){
        res.render("admin/usersClassify")
    }

    /**
     * 获取用户分类
     * @param req
     * @param res
     */
    getUsersClassify(req,res){
        usersModel.getUsersClassify(req.query.page,req.query.limit,function (err,result) {
            if (err) {
                res.json({code:404,msg:"获取失败"})
            }else {
                res.json({code:200,msg:"获取成功",data:result})
            }
        })
    }

    /**
     * 添加用户分类页
     * @param req
     * @param res
     */
    addUsersClassify(req,res){
        res.render('admin/addUsersClassify')
    }

    /**
     * 添加用户操作
     * @param req
     * @param res
     * @returns {*|Promise<any>}
     */
    addUsersClassifyDone(req,res){
        if(!validate.isRequired(req.body.classname)){
            return res.json({code:404,msg:"请输入分类名称"})
        }
        usersModel.addUsersClassiyfDone(req.body,function (err,result) {
            if(err || !result){
                res.json({code:404,msg:"添加失败"})
            }else{
                res.json({code:200,msg:"添加成功",data:{url:"/admin/usersClassify"}})
            }
        })
    }

    /**
     * 用户列表页
     * @param req
     * @param res
     */
    showUsers(req,res){
        res.render("admin/users")
    }

    /**
     * 获取用户列表信息
     * @param req
     * @param res
     */
    getUsers(req,res){
        usersModel.getUsers(req.query.page,req.query.limit,function (err,result) {
            if (err) {
                res.json({code:404,msg:"获取失败"})
            }else {
                res.json({code:200,msg:"获取成功",data:result})
            }
        })
    }

    /**
     * 添加用户页
     * @param req
     * @param res
     */
    addUsers(req,res){
        usersModel.getUsersClassifyName(function (err,result) {
            if (err){
                res.json({code:400,msg:"获取分类失败"})
            } else{
                res.render("admin/addUsers",{data:result})
            }
        })
    }

    /**
     * 添加用户操作
     * @param req
     * @param res
     * @returns {*|Promise<any>}
     */
    addUsersDone(req,res){
        if(!validate.isRequired(req.body.username)){
            return res.json({code:404,msg:"请输入用户名称"})
        }
        var password = "123465";
        var hmac = crypto.createHmac('sha1',system.salt_secret);
        hmac.update(password);
        password = hmac.digest("hex");
        req.body.password = password
        usersModel.addUsersDone(req.body,function (err,result) {
            if(err || !result){
                res.json({code:404,msg:"添加失败"})
            }else{
                res.json({code:200,msg:"添加成功",data:{url:"/admin/users"}})
            }
        })
    }
}

module.exports = new users()