var MongoDBHelper   = require("./mongodb_helper");
var SQLiteHelper    = require("./sqlite_helper");
var config          = require('../iot').config;
var _               = require("underscore");

function DBHandler() {
    'use strict';
    return;
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

DBHandler.postData = function (block, callback) {
    'use strict';
    SQLiteHelper.postData(block, callback);
//    MongoDBHelper.postData(block, callback);
};

DBHandler.deleteData = function (url, callback) {
    'use strict';
//    mongodb_deletedata(url, null);
    SQLiteHelper.deleteData(url, callback);
};

DBHandler.getData = function (url, db_callback) {
    'use strict';
//    MongoDBHelper.getData(url, db_callback);
    SQLiteHelper.getData(url, db_callback);
};

module.exports = DBHandler;
