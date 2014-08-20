var coap            = require('coap');
var server          = coap.createServer({});
var request_handler = require('./server/request_handler.js');

function iotcoap(){

}

iotcoap.run = function(){
    server.on('request', function(req, res) {
        switch(req.method){
            case "GET": request_handler.getHandler(req, res);
                break;
            case "POST":
            case "PUT":
                request_handler.syncHandler(req, res);
                break;
            case "DELETE":
                request_handler.deleteHandler(req, res);
                break;
            default: request_handler.errorRequest(res);
                break;
        }
    });

    server.listen(function() {
        console.log('server started');
    });

};

//iotcoap.run()
module.exports = iotcoap;