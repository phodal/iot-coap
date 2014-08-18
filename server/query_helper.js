var DBHelper = require('./db_helper.js');
var QueryData = require('./QueryData.js');

DBHelper.initDB();


function query_helper() {

}

query_helper.returnJSON = function(req, res) {
    DBHelper.urlQueryData(req.url, function (result) {
        QueryData.returnJSON(result, res);
    });
};

query_helper.returnXML = function(req, res) {
    DBHelper.urlQueryData(req.url, function (result) {
        QueryData.returnXML(result, res);
    });
};

module.exports = query_helper;