var sqlite3 = require('sqlite3').verbose();
var _      = require("underscore");
var config = require("../index").config;

function DBHelper() {
    'use strict';
    return;
}

DBHelper.initDB = function () {
    'use strict';
    var db = new sqlite3.Database(config["db_name"]);
    var create_table = 'create table if not exists ' + config["table_name"] + '(' + config["db_table"] + ');';

    db.serialize(function () {
        db.run(create_table);
        _.each(config["init_table"], function (insert_data) {
            db.run(insert_data);
        });
    });
    db.close();
};

function blockToJson(block) {
    'use strict';
    var result = {};

    if (!_.isEmpty(block)) {
        var str = "";
        str += "{";
        _.each(block, function (array, index) {
            str += '"' + config["key"][index] + '"' + ':"' + array + '",';
        });
        str = str.substring(0, str.length - 1);
        str += "}";
        result = JSON.parse(str);
    }
    return result;
}

function generateDBKey(this_block) {
    'use strict';
    var str = "";
    _.each(this_block, function (key) {
        str += key + ",";
    });
    str = str.substring(0, str.length - 1);
    return str;
}

DBHelper.syncData = function (block, callback) {
    'use strict';
    console.log(block);
    var db = new sqlite3.Database(config["db_name"]);
    var str = generateDBKey(config["key"]);
    var string = generateDBKey(block);
    var insert_db_string = "insert or replace into " + config["table_name"] + " (" + str + ") VALUES (" + string + ");";
    console.log(insert_db_string);
    db.all(insert_db_string, function (err) {
        db.close();
    });
    callback();
};


DBHelper.deleteData = function (url, callback) {
    'use strict';
    var db = new sqlite3.Database(config["db_name"]);

    console.log("DELETE * FROM  " + config["table_name"] + "  where " + url.split('/')[1] + "=" + url.split('/')[2]);
    var insert_db_string = "DELETE * FROM  " + config["table_name"] + "  where " + url.split('/')[1] + "=" + url.split('/')[2];
    console.log(insert_db_string);
    db.all(insert_db_string, function (err) {
        db.close();
    });
    callback();
};

DBHelper.urlQueryData = function (url, callback) {
    'use strict';
    var db = new sqlite3.Database(config["db_name"]);

    console.log("SELECT * FROM " + config["table_name"] + " where " + url.split('/')[1] + "=" + url.split('/')[2]);
    db.all("SELECT * FROM  " + config["table_name"] + "  where " + url.split('/')[1] + "=" + url.split('/')[2], function (err, rows) {
        db.close();
        callback(JSON.stringify(rows));
    });
};

module.exports = DBHelper;
