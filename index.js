const coap             = require('coap')
      ,server          = coap.createServer({})
      ,fs              = require('fs')
      ,file            = './iot.json';

function iotcoap(){

}

iotcoap.run = function(){
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }

        module.exports.config = JSON.parse(data);
        startIOT();
    });

    function startIOT(){
        var request_handler = require('./server/request_handler.js');
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
    }
};


//iotcoap.run();
module.exports = iotcoap;