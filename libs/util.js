module.exports = {
    isLogin(req,res,next){       // 判断是否已登录
        return next()   // 开发时 取消登录环节
       if (req.session.isLogin){
           return next()
       }else{
           res.redirect("/admin/login")
       }
    },
    isLogin_main(req,res,next){  //  若已登录，访问登录页面直接跳转至主页
        res.redirect("/admin/main")   // 开发时 取消登录环节
        if (!req.session.isLogin){
            return next()
        }else{
            res.redirect("/admin/main")
        }

    }
}