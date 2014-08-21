const coap             = require('coap')
      ,coapserver      = coap.createServer({})
      ,fs              = require('fs')
      ,file            = './iot.json'
      ,restify         = require('restify')
      ,restserver      = restify.createServer();


function iotcoap(){

}

function iotrest(){

}

iotrest.run = function(config){
    var restdb_helper = require('./server/db_helper');
    function respond(req, res, next) {
        restdb_helper.urlQueryData(req.url, function(e){
            res.send(JSON.parse(e));
            next();
        })
    };

    restserver.get(config["rest_url"], respond);
    restserver.head(config["rest_url"], respond);

    restserver.listen(config["rest_port"], function() {
        console.log('%s listening at %s', restserver.name, restserver.url);
    })
};

iotcoap.run = function(){
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }

        var config = JSON.parse(data);
        module.exports.config = config;
        iotrest.run(config);
        startIOT();
    });

    function startIOT(){
        var request_handler = require('./server/request_handler.js');
        coapserver.on('request', function(req, res) {
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

        coapserver.listen(function() {
            console.log('coap listening at coap://0.0.0.0:5683');
        });
    }
};


//iotcoap.run();
//iotrest.run();
module.exports = iotcoap;