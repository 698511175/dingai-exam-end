const env = process.env.NODE_ENV;
// console.log(env)
var config = {}
if (env.trim() === "production"){
    config.database = require("./production/database.js");
    config.system = require("./production/system.js");
}else {
    config.database = require("./development/database.js");
    config.system = require("./development/system.js");
}
Object.assign(config.system,require("./system"))
module.exports = config;