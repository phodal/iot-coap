var _             = require("underscore");
var DB_Factory    = require("./../database/db_factory");
var db_factory    = new DB_Factory();
var database      = db_factory.selectDB();

function rest_helper() {
    'use strict';
}

rest_helper.get_respond = function (req, res, next) {
    'use strict';
    database.getData(req.url, function (e) {
        res.send(JSON.parse(e));
        next();
    });
};

rest_helper.post_respond = function (req, res, next) {
    'use strict';
    var data = [];
    _.each((req.params), function (key) {
        if (typeof key === "string") {
            key = "'" + key + "'";
        }
        data.push(key);
    });
    database.postData(data, function (e) {
        res.send(JSON.parse(e));
        next();
    });
};


rest_helper.del_respond = function (req, res, next) {
    'use strict';
    database.deleteData(req.url, function (e) {
        res.send(JSON.parse(e));
        next();
    });
};

module.exports = rest_helper;