var mysql = require("../../libs/mysql")

class scoreModel {
    /**
     * 获取成绩列表信息
     * @param page
     * @param limit
     * @param callback
     */
    getScore(page=1,limit=5,callback){
        var offset = (page-1)*limit;
        mysql.query("select score.id,score.username,score.paper_id,score.score,paper.name from score left join paper on score.paper_id=paper.id limit ?,?",[offset,limit*1],function (err,data) {
            if (err){
                callback(err)
            } else {
                callback(null,{
                    count:data.length,
                    lists:data
                })
            }
        })
    }
}
module.exports = new scoreModel()