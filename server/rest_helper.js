const restdb_helper = require('./db_helper.js')
    ,_            = require("underscore");

function rest_helper(){

}

rest_helper.respond = function(req, res, next) {
    restdb_helper.urlQueryData(req.url, function(e){
        res.send(JSON.parse(e));
        next();
    })
};


rest_helper.get_respond = function (req, res, next) {
    restdb_helper.urlQueryData(req.url, function(e){
        res.send(JSON.parse(e));
        next();
    })
};

rest_helper.post_respond = function (req, res, next) {
    var data=[];
    _.each((req.params), function(key,value){
        if(typeof key === "string"){
            key = "'" + key + "'";
        }
        data.push(key);
    });
    restdb_helper.syncData(data, function(e){
        res.send({});
        next();
    })
};


rest_helper.del_respond = function (req, res, next) {
    restdb_helper.urlQueryData(req.url, function(e){
        res.send(JSON.parse(e));
        next();
    })
};

module.exports = rest_helper;