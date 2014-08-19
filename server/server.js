var coap            = require('coap');
var server          = coap.createServer({});
var request_handler = require('./request_handler.js');

server.on('request', function(req, res) {
    switch(req.method){
        case "GET": request_handler.getHandler(req, res);
            break;
        case "POST": request_handler.postHandler(req, res);
            break;
        case "PUT":
        case "DELETE": request_handler.methodNotSupport(res, req);
            break;
        default: request_handler.errorRequest(res);
            break;
    }
});

server.listen(function() {
    console.log('server started');
});