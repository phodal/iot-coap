const jstoxml = require('jstoxml');

function result_helper() {
}

result_helper.saveAndCode = function(block, res){
    res.code = '2.05';
    res.end({});
};

result_helper.deleteAndCode = function(block, res){
    res.code = '2.05';
    res.end(JSON.stringify({
        success: "delete"
    }));
};

result_helper.jsonAndCode = function(result, res) {
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

module.exports = result_helper;