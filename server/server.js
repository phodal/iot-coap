var DBHelper = require('./db_helper.js');
var coap = require('coap');
var server = coap.createServer({});
var QueryData = require('./QueryData.js');

DBHelper.initDB();

server.on('request', function(req, res) {
    if (req.headers['GET'] !== 0) {
        res.setOption('Accept', 'application/json');
        DBHelper.urlQueryData(req.url, function(result) {
            QueryData.returnJSON(result, res);
        });
    } else {
        res.end(JSON.stringify({
            error: "sorry"
        }));
    }
});

server.listen(function() {
    console.log('server started');
});