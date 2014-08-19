var coap            = require('coap');
var server          = coap.createServer({});
var request_handler = require('./request_handler.js');

server.on('request', function(req, res) {
    switch(req.method){
        case "GET": request_handler.getHandler(req, res);
            break;
        case "POST":
        case "PUT":
            request_handler.syncHandler(req, res);
            break;
        case "DELETE": request_handler.methodNotSupport(res, req);
            break;
        default: request_handler.errorRequest(res);
            break;
    }
});

server.listen(function() {
    console.log('server started');
});