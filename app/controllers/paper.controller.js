var {paperModel,classifyModel,usersModel} = require("../models");
var validate = require("../../libs/vaildate")

class paper{
    /**
     * 添加试卷展示页
     * @param req
     * @param res
     */
    addPaper(req,res){
        usersModel.getUsersClassifyName(function (err,users_data) {
            if (err){
                return res.json({msg:"用户分类获取失败"})
            }else {
                classifyModel.getClassifyName(function (err,classify_data) {
                    if (err){
                        return res.json({msg:"题库分类获取失败"})
                    }else {
                        res.render("admin/addPaper",{users_data:users_data,classify_data:classify_data})
                    }
                })
            }
        })
    }

    /**
     * 添加试卷操作
     * @param req
     * @param res
     */
    addPaperDone(req,res){
        var o = {}
        if (!validate.isRequired(req.body.name)) {
            return res.json({msg:"请填写试卷名称"})
        }
        if (!validate.isRequired(req.body.group_id)) {
            return res.json({msg:"请选择用户分类"})
        }
        if (!validate.isRequired(req.body.classify_id)) {
            return res.json({msg:"请选择题库分类"})
        }
        var start_time = new Date(req.body.start_time).getTime();
        var end_time = new Date(req.body.end_time).getTime()
        if (start_time>end_time){
            return res.json({msg:"结束时间不得小于开始时间"})
        }
        o.name = req.body.name;
        o.description = req.body.description || "暂无描述";
        o.start_time = start_time;
        o.end_time = end_time;
        o.duration = req.body.duration * 1 || 60;
        o.group_id = req.body.group_id * 1;
        if (typeof req.body.is_enable != "undefined"){
            o.is_enable = req.body.is_enable * 1;
        };
        o.classify_id = req.body.classify_id * 1 ;
        var singleN = req.body.choice_singleN?req.body.choice_singleN:0;
        var doubleN = req.body.choice_doubleN?req.body.choice_doubleN:0;
        var judge_N = req.body.judge_N?req.body.judge_N:0;
        o.ques_group = singleN +","+ doubleN +","+ judge_N;
        var singleS = req.body.choice_singleS?req.body.choice_singleS:0;
        var doubleS = req.body.choice_doubleS?req.body.choice_doubleS:0;
        var judge_S = req.body.judge_S?req.body.judge_S:0;
        o.score_group = singleS +","+ doubleS +","+ judge_S;
        o.create_at = Date.now();
        o.update_at = Date.now();
        paperModel.addPaperDone(o,function (err,result) {
            if (err){
                res.json({msg:"创建试题失败"})
            } else {
                res.json({code:200,msg:"创建成功",data:{url:"/admin/paper"}})
            }
        })
    }
    showPaper(req,res){
        res.render("admin/paper")
    }
}
module.exports = new paper()