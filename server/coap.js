const coap             = require('coap')
    ,coapserver      = coap.createServer({})
    ,fs              = require('fs')
    ,file            = './iot.json';

function iotcoap(){

}

function url_sanity_check(url) {
	if (url.split('/')[1] == 'id' && url.split('/')[2] == true) {
		return true;
	}
	
	return false;	
}

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
        const request_handler = require('./request_handler.js');
        coapserver.on('request', function(req, res) {
        	if (url_sanity_check(req.url) == false) {
        		request_handler.errorRequest(res);
        		return;
        	}
        	
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