var resultHelper  = require('./coap_result_helper.js');
var DB_Factory    = require("./../database/db_factory");
var db_factory    = new DB_Factory();
var database      = db_factory.selectDB();

function query_helper() {
    'use strict';
}

query_helper.postJSON = function (req, res, block) {
    'use strict';
    database.postData(block, function (result) {
        resultHelper.returnPOSTStatus(result, res);
    });
};

query_helper.deleteJSON = function (req, res) {
    'use strict';
    database.deleteData(req.url, function (result) {
        resultHelper.returnDeleteStatus(result, res);
    });
};

query_helper.getJSON = function (req, res) {
    'use strict';
    database.getData(req.url, function (result) {
        resultHelper.returnGETStatus(result, res, req);
    });
};

module.exports = query_helper;