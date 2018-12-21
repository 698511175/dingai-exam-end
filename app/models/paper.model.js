var mysql = require('../../libs/mysql')

class paper{
    /**
     * 添加试卷操作
     * @param data
     * @param callback
     */
    addPaperDone(data,callback){
        var d = []
        for(var i in data){
            d.push(data[i])
        }
        mysql.query("insert into paper (name,description,start_time,end_time,duration,group_id,is_enable,classify_id,ques_group,score_group,create_at,update_at)values(?,?,?,?,?,?,?,?,?,?,?,?)",d,function (err,result) {
            if (err){
                callback(err)
            } else {
                if(result.affectedRows > 0){
                    callback(null,true)
                }else {
                    callback(null,false)
                }
            }
        })
    }

    /**
     * 获取试卷名称
     * @param id
     * @param callback
     */
    getPaperName(id,callback){
        mysql.query("select name from paper where id=?",[id*1],function (err, result) {
            if (err){
                callback(err)
            } else {
                callback(null,result)

            }
        })
    }
}
module.exports = new paper()