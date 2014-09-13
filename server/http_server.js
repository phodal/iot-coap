const fs			  = require('fs')
const file			  = './iot.json'
const restify		  = require('restify')
const restserver	  = restify.createServer();

function rest(){

}

rest.run = function(){
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
		const http_helper = require("./http_helper.js");

		//
		// set http parameters
		//

        restserver.use(restify.acceptParser(['json', 'application/json']));
		restserver.use(restify.dateParser());
		restserver.use(restify.queryParser());
		restserver.use(restify.gzipResponse());
		restserver.use(restify.bodyParser());

		// http for static files

		restserver.get("/html/:html", 					restify.serveStatic({'directory': 'web'}));
		restserver.get("/js/:js", 						restify.serveStatic({'directory': 'web'}));

		// device id options

		restserver.post	("/v1.0/id/:id",				http_helper.post_device);
		restserver.put	("/v1.0/id/:id",				http_helper.put_device);
		restserver.get	("/v1.0/id/:id",				http_helper.get_device);
		restserver.del	("/v1.0/id/:id",				http_helper.del_device);
		restserver.get	("/v1.0/id",					http_helper.get_devices);

		// channel options

		restserver.post	("/v1.0/id/:id/ch/:ch",			http_helper.post_channel);
		restserver.put	("/v1.0/id/:id/ch/:ch",			http_helper.put_channel);
		restserver.get	("/v1.0/id/:id/ch/:ch",			http_helper.get_channel);
		restserver.del	("/v1.0/id/:id/ch/:ch",			http_helper.del_channel);
		restserver.get	("/v1.0/id/:id/ch",				http_helper.get_channels);

		// timestamp & value options

		restserver.post	("/v1.0/id/:id/ch/:ch/dp/:ts",	http_helper.post_datapoint);
		restserver.put	("/v1.0/id/:id/ch/:ch/dp/:ts",	http_helper.put_datapoint);
		restserver.get	("/v1.0/id/:id/ch/:ch/dp/:ts",	http_helper.get_datapoint);
		restserver.del	("/v1.0/id/:id/ch/:ch/dp/:ts",	http_helper.del_datapoint);
		restserver.get	("/v1.0/id/:id/ch/:ch/dp",		http_helper.get_datapoints);

		//
		// server listening
		//

		restserver.listen(config["rest_port"], function() {
			console.log('%s listening at %s', restserver.name, restserver.url);
		});
	}
};

module.exports = rest;
