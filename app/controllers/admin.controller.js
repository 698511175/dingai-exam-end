var {classifyModel} = require("../models");
var validate = require("../../libs/vaildate")
class admin{
    /**
     * 主页面
     * @param req
     * @param res
     */
    main(req,res){
        res.render("admin/index",{username:req.session.username})
    }
    /**
     *  题库分类
     * @param req
     * @param res
     */
    classify(req,res){
        res.render('admin/classify')
    }
    /**
     * 获取分类列表
     * @param req
     * @param res
     */
    getClassify(req,res){
        classifyModel.getClassify(req.query.page,req.query.limit,function (err,result) {
            if (err) {
                res.json({code:404,msg:"获取失败"})
            }else {
                res.json({code:200,msg:"获取成功",data:result})
            }
        })
    }
    /**
     * 添加分类页
     * @param req
     * @param res
     */
    addClassify(req,res){
        res.render('admin/addClassify')
    }

    /**
     * 添加分类操作
     * @param req
     * @param res
     * @returns {*|Promise<any>}
     */
    addClassifyDone(req,res){
        if(!validate.isRequired(req.body.classname)){
            return res.json({code:404,msg:"请输入分类名称"})
        }
        classifyModel.addClassiyfDone(req.body,function (err,result) {
            if(err || !result){
                res.json({code:404,msg:"添加失败"})
            }else{
                res.json({code:200,msg:"添加成功",data:{url:"/admin/classify"}})
            }
        })
    }

    /**
     * 修改分类操作
     * @param req
     * @param res
     */
    editClassify(req,res){
        var o = {};
        if (req.body.classname){
            o.classname = req.body.classname
        }
        if (typeof req.body.is_enable != "undefined"){
            o.is_enable = req.body.is_enable;
        }
        if (req.body.description){
            o.description = req.body.description
        }
        classifyModel.editClassify(o,req.query,function (err,result) {
            if (err || !result){
                res.json({
                    code:404,
                    msg:"修改失败"
                })
            } else{
                res.json({
                    code:200,
                    msg:"修改成功",
                    data:{
                        url:"/admin/classify"
                    }
                })
            }
        })
    }

    /**
     * 修改分类页
     * @param req
     * @param res
     * @param next
     */
    showEditClassify(req,res,next){
        classifyModel.getEditClassify(req.query,function (err,data) {
            if (err){
                next(err)
            }else{
                res.render("admin/editClassify",{data:data[0]})
            }
        })
    }

    /**
     * 删除分类
     * @param req
     * @param res
     * @returns {*|Promise<any>}
     */
    delClassify(req,res){
        if (!validate.isRequired(req.query.id)){
            return res.json({code:404,msg:"ID参数必传"})
        }
        classifyModel.delClassify(req.query.id,function (err,result) {
            if (err || !result){
                res.json({code:404,msg:"删除失败"})
            } else{
                res.json({code:200,msg:"删除成功"})
            }
        })
    }
}
module.exports = new admin();