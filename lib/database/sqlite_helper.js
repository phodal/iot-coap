var sqlite3         = require('sqlite3').verbose();
var _               = require("underscore");
var config          = require("../../iot").config;
var URLHandler      = require("../url_handler");
var IOT_DB          = require("./iot_db");

function SQLiteHelper() {
    'use strict';
    return;
}

SQLiteHelper.prototype = new IOT_DB();

SQLiteHelper.prototype.parseData = function (data) {
    'use strict';
    var str = "";
    _.each(data, function (key) {
        str += key + ",";
    });
    str = str.substring(0, str.length - 1);
    return str;
};

SQLiteHelper.prototype.init = function () {
    'use strict';
    var db = new sqlite3.Database(config.db_name);
    var sql_command = 'create table if not exists ' + config.table_name + '(' + config.db_table + ');';

    db.serialize(function () {
        db.run(sql_command);
        _.each(config.init_table, function (insert_data) {
            db.run(insert_data);
        });
    });
    db.close();
};

SQLiteHelper.prototype.postData = function (block, callback) {
    'use strict';
    var db = new sqlite3.Database(config.db_name);
    var str = this.parseData(config.keys);
    var string = this.parseData(block);

    var sql_command = "insert or replace into " + config.table_name + " (" + str + ") VALUES (" + string + ");";
    db.all(sql_command, function (err) {
        SQLiteHelper.prototype.errorHandler(err);
        db.close();
        callback();
    });
};

SQLiteHelper.prototype.deleteData = function (url, callback) {
    'use strict';
    var db = new sqlite3.Database(config.db_name);
    var sql_command = "DELETE FROM  " + config.table_name + "  where " + URLHandler.getKeyFromURL(url) + "=" + URLHandler.getValueFromURL(url);
    db.all(sql_command, function (err) {
        SQLiteHelper.prototype.errorHandler(err);
        db.close();
        callback();
    });
};

SQLiteHelper.prototype.getData = function (url, callback) {
    'use strict';
    var db = new sqlite3.Database(config.db_name);
    var sql_command = "SELECT * FROM  " + config.table_name + "  where " + URLHandler.getKeyFromURL(url) + "=" + URLHandler.getValueFromURL(url);
    db.all(sql_command, function (err, rows) {
        SQLiteHelper.prototype.errorHandler(err);
        db.close();
        callback(JSON.stringify(rows));
    });
};

module.exports = SQLiteHelper;
