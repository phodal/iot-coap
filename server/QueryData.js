var jstoxml = require('jstoxml');

function QueryData() {

}
QueryData.postJsonToDB = function(block, res){
    res.code = '2.05';
    res.end({});
};

QueryData.returnJSON = function(result, res) {
    if (result.length == 2) {
        res.code = '4.04';
        res.end(JSON.stringify({
            error: "Not Found"
        }));
    } else {
        res.code = '2.05';
        res.end(result);
    }
};


QueryData.returnXML = function (result, res) {
    if (result.length == 2) {
        res.code = '4.04';
        res.end(jstoxml.toXML({
            error: "Not Found"
        }));
    } else {
        res.code = '2.05';
        res.end(jstoxml.toXML(JSON.parse(result)));
    }
};

module.exports = QueryData;