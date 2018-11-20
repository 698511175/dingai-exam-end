class admin{
    main(req,res){
        res.send("后台主页")
    }
}

module.exports = new admin();