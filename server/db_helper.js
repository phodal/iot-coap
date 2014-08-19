var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = "./iot.json";
var _ = require("underscore");

config = {
    "db_name": "iot.db",
    "db_table": "id integer primary key, value text, sensors1 float, sensors2 float",
    "init_table":[
        "insert or replace into basic (id,value,sensors1,sensors2) VALUES (1, 'is id 1', 19, 20);",
        "insert or replace into basic (id,value,sensors1,sensors2) VALUES (2, 'is id 2', 20, 21);"
    ],
    "query_table":"select * from basic;"
};

function DBHelper(){

}

DBHelper.initDB = function(){
    var db = new sqlite3.Database(config["db_name"]);
    var create_table = 'create table if not exists basic (' + config["db_table"] + ');';

    db.serialize(function() {
        db.run(create_table);
        _.each(config["init_table"], function(insert_data) {
            db.run(insert_data);
        });
    });
    db.close();
};

function blockToJson(block) {
    var result = {};

    if (!_.isEmpty(block)) {
        var db_index = ["id", "value", "sensors1", "sensors2"];
        var str = "";
        str += "{";
        _.each(block, function (array, index) {
            str += '"' + db_index[index] + '"' + ':"' + array + '",';
        });
        str = str.substring(0, str.length - 1);
        str += "}";
        result = JSON.parse(str);
    }
    return result;
}
DBHelper.syncData = function (block, callback) {
    var db = new sqlite3.Database(config["db_name"]);
    block = blockToJson(block);
    var string = block['id'] + ",'" + block['value'] + "'," + block['sensors1'] + "," + block["sensors2"];
    var insert_db_string = "insert or replace into basic (id,value,sensors1,sensors2) VALUES (" + string + ");";
    db.all(insert_db_string, function(err){
        db.close();
    });
    callback();
};

DBHelper.urlQueryData = function (url, callback) {
    var db = new sqlite3.Database(config["db_name"]);

    var result = [];
    console.log("SELECT * FROM basic where " + url.split('/')[1] + "=" + url.split('/')[2]);
    db.all("SELECT * FROM basic where " + url.split('/')[1] + "=" + url.split('/')[2], function(err, rows) {
        db.close();
        callback(JSON.stringify(rows));
    });
};

module.exports = DBHelper;
