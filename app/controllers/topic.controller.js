var {topicModel,classifyModel} = require("../models");
var validate = require("../../libs/vaildate");

class topic{
    /**
     * 显示 试题列表
     * @param req
     * @param res
     */
    showTopic(req,res){
        res.render("admin/topic")
    }
    /**
     * 添加试题页面
     * @param req
     * @param res
     */
    addTopic(req,res){
        classifyModel.getClassifyName(function (err,result) {
            if (err){
                res.json({code:400,msg:"获取分类失败"})
            } else{
                res.render("admin/addTopic",{data:result})
            }
        })
    }

    /**
     *  编辑试题页面
     * @param req
     * @param res
     */
    showEditTopic(req,res){
        classifyModel.getClassifyName(function (err,classify_data) {
            if (err){
                res.json({code:400,msg:"获取分类失败"})
            } else{
                topicModel.getEditTopic(req.query,function (err,topic_data) {
                    if (err){
                        res.json({code:400,msg:"获取试题失败"})
                    } else {
                        res.render("admin/editTopic",{classify_data:classify_data,topic_data:topic_data})
                    }
                })
            }
        })
    }
    /**
     * 添加试题
     * @param req
     * @param res
     * @returns {*}
     */
    addTopicDone(req,res){
        if(!validate.isRequired(req.body.classify_id)){
            return res.json({code:404,msg:"请确认试卷分类"})
        }
        if(!validate.isRequired(req.body.type)){
            return res.json({code:404,msg:"请确认试卷类型"})
        }
        if(!validate.isRequired(req.body.level)){
            return res.json({code:404,msg:"请确认试卷难度"})
        }
        if(!validate.isRequired(req.body.stem)){
            return res.json({code:404,msg:"请输入题干"})
        }
        if(!req.body.type==3){
            if(!validate.isRequired(req.body.choice_forA)){
                return res.json({code:404,msg:"请确认A选项"})
            }
            if(!validate.isRequired(req.body.choice_forB)){
                return res.json({code:404,msg:"请确认B选项"})
            }
            if(!validate.isRequired(req.body.choice_forC)){
                return res.json({code:404,msg:"请确认C选项"})
            }
            if(!validate.isRequired(req.body.choice_forD)){
                return res.json({code:404,msg:"请确认D选项"})
            }
            if(!validate.isRequired(req.body.choice_forD)){
                return res.json({code:404,msg:"请确认D选项"})
            }
        }
        switch (req.body.type*1) {
            case 1 :
                if (!req.body.answ_c1) {res.json({msg:"请设置正确答案"});return false};
                break;
            case 2 :
                if (!(req.body.answ_c2A || req.body.answ_c2B || req.body.answ_c2C || req.body.answ_c2D)) {res.json({msg:"请设置正确答案"});return false};
                break;
            case 3 :
                if (!req.body.answ_j) {res.json({msg:"请设置正确答案"});return false};
                break;
        }
        topicModel.addTopicDone(req.body,function (err, result) {
            if (err){
                res.json({code:404,msg:"添加失败"})
            } else{
                res.json({code:200,msg:"添加成功",data:{url:"/admin/topic"}})
            }
        })

    }

    /**
     * 获取试题
     * @param req
     * @param res
     */
    getTopic(req,res){
        topicModel.getTopic(req.query.page,req.query.limit,function (err,result) {
            if (err) {
                res.json({code:404,msg:"获取失败"})
            }else {
                res.json({code:200,msg:"获取成功",data:result})
            }
        })
    }

    /**
     * 编辑试题
     * @param req
     * @param res
     */
    editTopic(req,res){
        var o = {};
        if (typeof req.body.status != "undefined"){
            o.status = req.body.status;
        }
        if (req.body.stem){
            o.stem = req.body.stem;
        }
        if (req.body.level){
            o.level = req.body.level;
        }
        if (req.body.classify_id){
            o.classify_id = req.body.classify_id;
        }
        if (req.body.type==3){
           if (req.body.answ_j){
              o.answer = req.body.answ_j
           }
        }else{
            if(req.body.choice_forA){
                o.a = req.body.choice_forA
            }
            if(req.body.choice_forB){
                o.b = req.body.choice_forB
            }
            if(req.body.choice_forC){
                o.c = req.body.choice_forC
            }
            if(req.body.choice_forD){
                o.d = req.body.choice_forD
            }
            o.answer = ""
            if(req.body.answ_c2A){
                o.answer += req.body.answ_c2A
            }
            if(req.body.answ_c2B){
                o.answer += req.body.answ_c2B
            }
            if(req.body.answ_c2C){
                o.answer += req.body.answ_c2C
            }
            if(req.body.answ_c2D){
                o.answer += req.body.answ_c2D
            }
            if(req.body.answ_c1){
                o.answer = req.body.answ_c1
            }
        }
        topicModel.editTopic(o,req.query.id,req.query.type,function (err,result) {
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
                        url:"/admin/topic"
                    }
                })
            }
        })
    }
    delTopic(req,res){
        if (!validate.isRequired(req.query.id)){
            return res.json({code:404,msg:"ID参数必传"})
        }
        if (!validate.isRequired(req.query.type)){
            return res.json({code:404,msg:"类型参数必传"})
        }
        topicModel.delTopic(req.query.id,req.query.type,function (err,result) {
            if (err || !result){
                res.json({code:404,msg:"删除失败"})
            } else{
                res.json({code:200,msg:"删除成功"})
            }
        })
    }
}

module.exports = new topic();

