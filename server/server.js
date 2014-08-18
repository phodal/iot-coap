var coap = require('coap');
var server = coap.createServer({});
var qh = require('./query_helper.js');

server.on('request', function(req, res) {
    console.log(req.method);
    if (req.method == 'GET') {
        console.log(req.headers['Accept']);
        switch(req.headers['Accept']){
            case "application/json": qh.returnJSON(req, res);
                break;
            case "application/xml": qh.returnXML(req, res);
                break;
        }
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