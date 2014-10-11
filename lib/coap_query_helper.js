var DBHandler      = require('./db_handler.js');
var resultHelper = require('./coap_result_helper.js');

function query_helper() {
    'use strict';
    return;
}

query_helper.postJSON = function (req, res, block) {
    'use strict';
    DBHandler.postData(block, function (result) {
        resultHelper.returnPOSTStatus(result, res);
    });
};

query_helper.deleteJSON = function (req, res) {
    'use strict';
    DBHandler.deleteData(req.url, function (result) {
        resultHelper.returnDeleteStatus(result, res);
    });
};

query_helper.getJSON = function (req, res) {
    'use strict';
    DBHandler.getData(req.url, function (result) {
        resultHelper.returnGETStatus(result, res, req);
    });
};

module.exports = query_helper;