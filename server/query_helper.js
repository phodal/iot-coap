const DBHelper      = require('./db_helper.js')
      ,returnResult = require('./retunResultAndCode.js');

DBHelper.initDB();


function query_helper() {

}

query_helper.syncJSON = function(req, res, block) {
    DBHelper.syncData(block, function (result) {
        returnResult.saveAndCode(block, res);
    });
};

query_helper.deleteData = function(req, res){
    DBHelper.deleteData(req.url, function (result) {
        returnResult.deleteAndCode(result, res);
    });
};

query_helper.postXML = function(req, res) {

};

query_helper.returnJSON = function(req, res) {
    DBHelper.urlQueryData(req.url, function (result) {
        returnResult.jsonAndCode(result, res);
    });
};

query_helper.returnXML = function(req, res) {
    DBHelper.urlQueryData(req.url, function (result) {
        returnResult.XMLAndCode(result, res);
    });
};

module.exports = query_helper;