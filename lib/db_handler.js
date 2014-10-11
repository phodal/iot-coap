var MongoDBHelper   = require("./mongodb_helper");
var SQLiteHelper    = require("./sqlite_helper");
var config          = require('../iot').config;
var _               = require("underscore");

function DBHandler() {
    'use strict';
    return;
}

DBHandler.postData = function (block, callback) {
    'use strict';
    if (config.db === "sqlite3") {
        SQLiteHelper.postData(block, callback);
    } else if (config.db === "mongodb") {
        MongoDBHelper.postData(block, callback);
    }
};

DBHandler.deleteData = function (url, callback) {
    'use strict';
    if (config.db === "sqlite3") {
        SQLiteHelper.deleteData(url, callback);
    } else if (config.db === "mongodb") {
        MongoDBHelper.deleteData(url, null);
    }
};

DBHandler.getData = function (url, db_callback) {
    'use strict';
    if (config.db === "sqlite3") {
        SQLiteHelper.getData(url, db_callback);
    } else if (config.db === "mongodb") {
        MongoDBHelper.getData(url, db_callback);
    }
};

module.exports = DBHandler;
