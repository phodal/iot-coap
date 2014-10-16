var DB_Factory   = require("./db_factory");

var db_factory = new DB_Factory();
var database = db_factory.selectDB();

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
