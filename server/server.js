var DBHelper = require('./db_helper.js');
var coap = require('coap');
var server = coap.createServer({});
var QueryData = require('./QueryData.js');

DBHelper.initDB();

server.on('request', function(req, res) {
    console.log(req.method);
    if (req.method == 'GET') {
        DBHelper.urlQueryData(req.url, function(result) {
            QueryData.returnJSON(result, res);
        });
    } else if (req.method == 'POST' || req.method == 'PUT' || req.method == 'DELETE') {
        res.end(JSON.stringify({
            message: req.method +" is no support now"
        }));
    }else {
        res.end(JSON.stringify({
            error: "sorry"
        }));
    }
});

server.listen(function() {
    console.log('server started');
});