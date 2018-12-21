var mysql = require('../../libs/mysql')
class login{
    /**
     * 获取登录信息
     * @param username
     * @param callback
     */
    getUser(username,callback){
        mysql.query('select * from admin where username=?',[username],function (err,result) {
            if (err){
                callback(err)
            }else{
                callback(null,result);
            }
        })
    }

    /**
     * 修改密码操作
     * @param data
     * @param callback
     */
    changePass(data,callback){
        mysql.query('select * from admin where username=?',[data.username],function (err,result) {
            if (err){
                callback(err,{code:404,msg:"错误"})
            }else{
                if (result.length == 0){
                    callback(err,{code:404,msg:"用户名不存在"})
                }else {
                    if (data.password == result[0].password){
                        mysql.query("update admin set password=? where username=?",[data.newPass,data.username],function (err,finish) {
                            if (finish.affectedRows > 0){
                                callback(null,{code:200,msg:"修改成功"})
                            } else{
                                callback(err,{code:404,msg:"修改失败"})
                            }
                        })
                    }else{
                        callback(err,{code:404,msg:"原密码输入错误"})
                    }
                }
            }
        })
    }
}

module.exports = new login();