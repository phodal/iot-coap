const coap			= require('coap');
const coapserver	= coap.createServer({});
const fs			= require('fs');
const file 			= './iot.json';
const _				= require('underscore');

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
		coapserver.on('request', function(req, res) {
			if (url_sanity_check(req.url) == false) {
				coap_helper.urlErrorRequest(res);
				return;
			}

			switch(req.method){
				case "GET":
					coap_helper.getHandler(req, res);
					break;
				case "POST":
				case "PUT":
					coap_helper.syncHandler(req, res);
					break;
				case "DELETE":
					coap_helper.deleteHandler(req, res);
					break;
				default:
					coap_helper.errorRequest(res);
					break;
			}
		});

		coapserver.listen(function() {
			console.log('coap listening at coap://0.0.0.0:5683');
		});
	}
};

module.exports = iotcoap;