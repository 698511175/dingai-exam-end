var mysql = require('../../libs/mysql')

class classify {
    /**
     * 获取分类页信息
     * @param page
     * @param limit
     * @param callback
     */
    getClassify(page=1,limit=5,callback){
        var offset = (page-1)*limit;
        mysql.query('select count(*) as len from classify',function (err,data) {
            mysql.query('select * from classify limit ?,?',[offset,limit * 1],function (err,result) {
                if (err){
                    callback(err)
                } else{
                    callback(null,{
                        count : data[0].len,
                        lists : result
                    })
                }
            })
        })
    }

    /**
     * 获取全部分类
     * @param callback
     */
    getClassifyName(callback){
        mysql.query('select * from classify',function (err,result) {
            if (err){
                callback(err)
            } else{
                callback(null,result)
            }
        })
    }

    /**
     * 添加分类操作
     * @param data
     * @param callback
     */
    addClassiyfDone(data,callback){
        var d = [
            data.classname,
            data.description || '',
            data.is_enable?data.is_enable*1:1,
            Date.now(),
            Date.now()
        ]
        mysql.query("insert into classify (classname,description,is_enable,create_at,update_at)values(?,?,?,?,?)",d,function (err,result) {
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
     * 修改分类操作
     * @param data
     * @param trem
     * @param callback
     */
    editClassify(data,trem,callback){
        var str = ""
        data["update_at"] = Date.now();
        for(var i in data){
            str += i + '= "' + data[i] + '",';
        }
        str = str.slice(0,-1);
        mysql.query("update classify set " + str + " where id=?",[trem.id*1],function (err,result) {
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
     * 获取修改分类页信息
     * @param id
     * @param callback
     */
    getEditClassify(id,callback){
        mysql.query("select * from classify where id=?",[id.id],function (err,result) {
            if (err){
                callback(err)
            } else {
                callback(null,result)
            }
        })
    }

    /**
     * 删除分类操作
     * @param id
     * @param callback
     */
    delClassify(id,callback){
        mysql.query("delete from classify where id=?",[id],function (err,result) {
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

module.exports = new classify()