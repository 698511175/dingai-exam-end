var {scoreModel,paperModel} = require("../models");

class score{
    /**
     * 分数列表页
     * @param req
     * @param res
     */
    showScore(req,res){
        res.render("admin/score")
    }

    /**
     * 获取分数列表信息
     * @param req
     * @param res
     */
    getScore(req,res){
        scoreModel.getScore(req.query.page,req.query.limit,function (err,result) {
            if (err){
                res.json({code:404,msg:"成绩获取失败"})
            }else {
                res.json({code:200,msg:"获取成功",data:result})
            }
        })
    }
}

module.exports = new score()