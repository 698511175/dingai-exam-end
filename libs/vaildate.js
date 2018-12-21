module.exports = {
    isRequired(input){
        if(typeof input == "string"){    // 判断输入的类型是不是字符串
            input = input.replace(/\s/g,'');     // 去掉字符串的所有空格
        }
        if (typeof input === "undefined" || input === ""){
            return false;     // 若输入的类型是 undefined 或 空 则返回false
        }
        return true
    }
}