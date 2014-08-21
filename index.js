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

iotrest.run = function(){
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }

        var config = JSON.parse(data);
        module.exports.config = config;
        startRESTIOT(config);
    });
    function startRESTIOT(config){
        const rest_helper = require("./server/rest_helper.js");

        restserver.use(restify.gzipResponse());
        restserver.use(restify.bodyParser());
        restserver  .use(restify.acceptParser(['json', 'application/json']));

        restserver.get(config["rest_url"],       rest_helper.get_respond);
        restserver.put(config["rest_post_url"],  rest_helper.post_respond);
        restserver.del(config["rest_url"],       rest_helper.del_respond);
        restserver.post(config["rest_post_url"], rest_helper.post_respond);
        restserver.head(config["rest_url"],      rest_helper.respond);

        restserver.listen(config["rest_port"], function() {
            console.log('%s listening at %s', restserver.name, restserver.url);
        });
    }
};

iotcoap.run = function(){
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }
        var config = JSON.parse(data);
        module.exports.config = config;

        startIOT();
    });

    function startIOT(){
        const request_handler = require('./server/request_handler.js');
        coapserver.on('request', function(req, res) {
            switch(req.method){
                case "GET":     request_handler.getHandler(req, res);
                    break;
                case "POST":
                case "PUT":     request_handler.syncHandler(req, res);
                    break;
                case "DELETE":  request_handler.deleteHandler(req, res);
                    break;
                default:        request_handler.errorRequest(res);
                    break;
            }
        });

        coapserver.listen(function() {
            console.log('coap listening at coap://0.0.0.0:5683');
        });
    }
};

module.exports = iotcoap;
module.exports = iotrest;