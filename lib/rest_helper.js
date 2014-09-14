var restdb_helper = require('./db_helper.js');
var _             = require("underscore");

function rest_helper() {
    'use strict';
    return;
}

rest_helper.respond = function (req, res, next) {
    'use strict';
    restdb_helper.urlQueryData(req.url, function (e) {
        res.send(JSON.parse(e));
        next();
    });
};


rest_helper.get_respond = function (req, res, next) {
    'use strict';
    restdb_helper.urlQueryData(req.url, function (e) {
        res.send(JSON.parse(e));
        next();
    });
};

rest_helper.post_respond = function (req, res, next) {
    'use strict';
    var data = [];
    _.each((req.params), function (key, value) {
        if (typeof key === "string") {
            key = "'" + key + "'";
        }
        data.push(key);
    });
    restdb_helper.syncData(data, function (e) {
        res.send({});
        next();
    });
};


rest_helper.del_respond = function (req, res, next) {
    'use strict';
    restdb_helper.urlQueryData(req.url, function (e) {
        res.send(JSON.parse(e));
        next();
    });
};

module.exports = rest_helper;