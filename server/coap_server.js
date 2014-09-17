const coap			= require('coap');
const coapserver	= coap.createServer({});
const fs			= require('fs');
const file 		= './iot.json';
const _			= require('underscore');

function iotcoap(){
}

iotcoap.run = function(){
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) {
			console.log('Error: ' + err);
			return;
		}
		var config = JSON.parse(data);
		module.exports.config = config;

		startIOT(config);
	});

	 function startIOT(config){

		function url_sanity_check(url) {

			var ret = true;
			var str = url.split('/');
			_.each(config["key"], function (array, index) {
				if (index >= str.length) {
					return;
				}

				if (index > 0 && str[index]  == '') {
					ret = false;
					return;
				}

				if (config["key"][index]) {
					if(str[index] !== config["key"][index] ){
						ret = false;
						return;
					}
				}
			});

			return ret;
		}

         const coap_helper = require('./coap_helper.js');
         const route_helper = require('./route_helper.js');

		coapserver.on('request', function(req, res) {
            route_helper.handle(req, res, function(err) {
                console.log('err:' + err);
            });
		});

         // device id options

         route_helper.post("/v1.0/id/:id",				coap_helper.post_device);
         route_helper.put	("/v1.0/id/:id",				coap_helper.put_device);
         route_helper.get	("/v1.0/id/:id",				coap_helper.get_device);
         route_helper.del	("/v1.0/id/:id",				coap_helper.del_device);
         route_helper.get	("/v1.0/id",					coap_helper.get_devices);

         // channel options

         route_helper.post("/v1.0/id/:id/ch/:ch",			coap_helper.post_channel);
         route_helper.put	("/v1.0/id/:id/ch/:ch",			coap_helper.put_channel);
         route_helper.get	("/v1.0/id/:id/ch/:ch",			coap_helper.get_channel);
         route_helper.del	("/v1.0/id/:id/ch/:ch",			coap_helper.del_channel);
         route_helper.get	("/v1.0/id/:id/ch",				coap_helper.get_channels);

         // timestamp & value options

         route_helper.post("/v1.0/id/:id/ch/:ch/dp/:ts",	coap_helper.post_datapoint);
         route_helper.put	("/v1.0/id/:id/ch/:ch/dp/:ts",	coap_helper.put_datapoint);
         route_helper.get	("/v1.0/id/:id/ch/:ch/dp/:ts",	coap_helper.get_datapoint);
         route_helper.del	("/v1.0/id/:id/ch/:ch/dp/:ts",	coap_helper.del_datapoint);
         route_helper.get	("/v1.0/id/:id/ch/:ch/dp",		coap_helper.get_datapoints);

         coapserver.listen(function() {
			console.log('coap listening at coap://0.0.0.0:5683');
         });
	}
};

module.exports = iotcoap;