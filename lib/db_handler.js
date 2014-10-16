var MongoDBHelper   = require("./mongodb_helper");
var SQLiteHelper    = require("./sqlite_helper");
var config          = require('../iot').config;

function DB_Factory() {
    'use strict';
    return;
}

DB_Factory.prototype.DBClass = SQLiteHelper;

DB_Factory.prototype.selectDB = function () {
    'use strict';
    if (config.db === 'sqlite3') {
        this.DBClass = SQLiteHelper;
    } else if (config.db === "mongodb") {
        this.DBClass = MongoDBHelper;
    }
    return this.DBClass;
};

var db_factory = new DB_Factory();
var database = db_factory.selectDB();

console.log(database);

function DBHandler() {
    'use strict';
    return;
}

DBHandler.init = function () {
    'use strict';
    database.init();
};

DBHandler.postData = function (block, callback) {
    'use strict';
    database.postData(block, callback);
};

DBHandler.deleteData = function (url, callback) {
    'use strict';
    database.deleteData(url, callback);
};

DBHandler.getData = function (url, callback) {
    'use strict';
    database.getData(url, callback);
};

module.exports = DBHandler;
