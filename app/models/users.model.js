var mysql = require('../../libs/mysql')

class users{
    /**
     * 获取用户分类
     * @param page
     * @param limit
     * @param callback
     */
    getUsersClassify(page=1,limit=5,callback){
        var offset = (page-1)*limit;
        mysql.query('select count(*) as len from users_classify',function (err,data) {
            mysql.query('select * from users_classify limit ?,?',[offset,limit * 1],function (err,result) {
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
     * 获取用户分类名
     * @param callback
     */
    getUsersClassifyName(callback){
        mysql.query('select * from users_classify',function (err,result) {
            if (err){
                callback(err)
            } else{
                callback(null,result)
            }
        })
    }

    /**
     * 添加用户分类操作
     * @param data
     * @param callback
     */
    addUsersClassiyfDone(data,callback){
        var d = [
            data.classname,
            data.is_enable?data.is_enable*1:1,
            Date.now(),
            Date.now()
        ]
        mysql.query("insert into users_classify (classname,is_enable,create_at,update_at)values(?,?,?,?)",d,function (err,result) {
            if (err){
                console.log(err)
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
     * 获取用户列表
     * @param page
     * @param limit
     * @param callback
     */
    getUsers(page=1,limit=5,callback){
        var offset = (page-1)*limit;
        mysql.query('select count(*) as len from users',function (err,data) {
            mysql.query('select * from users limit ?,?',[offset,limit * 1],function (err,result) {
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
     * 添加用户操作
     * @param data
     * @param callback
     */
    addUsersDone(data,callback){
        var d = [
            data.username,
            data.password,
            data.classify_id,
            data.is_enable,
        ]
        mysql.query("insert into users (username,password,classify_id,is_enable)values(?,?,?,?)",d,function (err,result) {
            if (err){
                console.log(err)
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

module.exports = new users()
