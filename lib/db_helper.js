var MongoDBHelper   = require("./mongodb_helper");
var SQLiteHelper    = require("./sqlite_helper");

function DBHelper() {
    'use strict';
    return;
}

DBHelper.postData = function (block, callback) {
    'use strict';
    SQLiteHelper.postData(block, callback);
//    var convertedData = generateDBMap(str, string);
//    MongoDBHelper.postData(convertedData, callback);
};

DBHelper.deleteData = function (url, callback) {
    'use strict';
//    mongodb_deletedata(url, null);
    SQLiteHelper.deleteData(url, callback);
};

DBHelper.getData = function (url, db_callback) {
    'use strict';
//    MongoDBHelper.getData(url, db_callback);
    SQLiteHelper.getData(url, db_callback);
};

module.exports = DBHelper;
