var jstoxml = require('jstoxml');

function resultReturn() {

}
resultReturn.saveAndCode = function(block, res){
    res.code = '2.05';
    res.end({});
};

resultReturn.deleteAndCode = function(block, res){
    res.code = '2.05';
    res.end(JSON.stringify({
        success: "delete"
    }));
};

resultReturn.jsonAndCode = function(result, res) {
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


resultReturn.XMLAndCode = function (result, res) {
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

module.exports = resultReturn;