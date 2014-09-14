var DBHelper      = require('./db_helper.js');
var returnResult = require('./result_helper.js');

function query_helper() {
    'use strict';
    return;
}

query_helper.syncJSON = function (req, res, block) {
    'use strict';
    DBHelper.syncData(block, function () {
        returnResult.saveAndCode(block, res);
    });
};

query_helper.deleteData = function (req, res) {
    'use strict';
    DBHelper.deleteData(req.url, function (result) {
        returnResult.deleteAndCode(result, res);
    });
};

query_helper.returnJSON = function (req, res) {
    'use strict';
    DBHelper.urlQueryData(req.url, function (result) {
        returnResult.jsonAndCode(result, res);
    });
};

module.exports = query_helper;