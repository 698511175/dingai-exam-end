var mysql = require("../../libs/mysql")

class topic{
    /**
     * 获取题库列表信息
     * @param page
     * @param limit
     * @param callback
     */
    getTopic(page=1,limit=5,callback){
        var offset = (page-1)*limit;
        mysql.query("select sum(a) as len from(select count(judge.id) as a from judge union all select count(choice.id) as a from choice) as count",function (err,data) {
            mysql.query("select judge.id,judge.stem,judge.type,judge.classify_id,judge.status,judge.level,judge.update_at,c1.classname from judge left join classify as c1 on judge.classify_id=c1.id union all select choice.id,choice.stem,choice.type,choice.classify_id,choice.status,choice.level,choice.update_at,c2.classname from choice left join classify as c2 on choice.classify_id=c2.id limit ?,?",[offset,limit*1],function (err,result) {
                if (err){
                    callback(err)
                } else {
                    callback(null,{
                        count:data[0].len,
                        lists:result
                    })
                }
            })
        })
    }

    /**
     * 获取编辑信息
     * @param data
     * @param callback
     */
    getEditTopic(data,callback){
        var table = data.type==3?"judge":"choice";
        mysql.query("select * from "+ table + " where id=?",[data.id*1],function (err,result) {
            if (err){
                callback(err)
            } else {
                callback(null,result)
            }
        })
    }

    /**
     * 修改题库
     * @param data
     * @param id
     * @param type
     * @param callback
     */
    editTopic(data,id,type,callback){
        var str = ""
        data["update_at"] = Date.now();
        for(var i in data){
            str += i + '= "' + data[i] + '",';
        }
        str = str.slice(0,-1);
        var topicType = (type==3?'judge':'choice')
        mysql.query("update " + topicType+ " set " + str + " where id=?",[id * 1],function (err,result) {
            if (err){
                callback(err)
            } else {
                if (result.affectedRows > 0) {
                    callback(null,true)
                }else {
                    callback(null,false)
                }
            }
        })

    }

    /**
     * 添加题库操作
     * @param data
     * @param callback
     */
    addTopicDone(data,callback){
        var d = [
            data.stem,
            data.type,
            data.classify_id,
            data.status,
            data.level,
            Date.now(),
            Date.now()
        ]
        if (data.type == 3){
            d.splice(1,0,data.answ_j)
        }else if(data.type == 2){
            var an = (data.answ_c2A || '') + (data.answ_c2B || '') + (data.answ_c2C || '') + (data.answ_c2D || '')
            d.splice(1,0,data.choice_forA,data.choice_forB,data.choice_forC,data.choice_forD,an)
        }else {
            d.splice(1,0,data.choice_forA,data.choice_forB,data.choice_forC,data.choice_forD,data.answ_c1)
        }
        mysql.query(data.type==3?"insert into judge (stem,answer,type,classify_id,status,level,create_at,update_at)values(?,?,?,?,?,?,?,?)":"insert into choice (stem,a,b,c,d,answer,type,classify_id,status,level,create_at,update_at)values(?,?,?,?,?,?,?,?,?,?,?,?)",d,function (err,result) {
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
     * 删除题库
     * @param id
     * @param type
     * @param callback
     */
    delTopic(id,type,callback){
        var topicType = (type==3?'judge':'choice')
        mysql.query("delete from "+ topicType +" where id=?",[id],function (err,result) {
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
}

module.exports = new topic();