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

		//
		// http for static files
		//

		restserver.get("/html/:html", 	restify.serveStatic({'directory': 'web'}));
		restserver.get("/js/:js", 	restify.serveStatic({'directory': 'web'}));

		//
		// device id options
		//

		restserver.post	("/v1.0/id/:id",		http_helper.post_id);
		restserver.put	("/v1.0/id/:id",		http_helper.put_id);
		restserver.get	("/v1.0/id/:id",		http_helper.get_id);
		restserver.del	("/v1.0/id/:id",		http_helper.del_id);
		restserver.get	("/v1.0/id",			http_helper.get_ids);

		//
		// channel options
		//

		restserver.post	("/v1.0/id/:id/ch/:ch",	http_helper.post_ch);
		restserver.put	("/v1.0/id/:id/ch/:ch",	http_helper.put_ch);
		restserver.get	("/v1.0/id/:id/ch/:ch",	http_helper.get_ch);
		restserver.del	("/v1.0/id/:id/ch/:ch",	http_helper.del_ch);
		restserver.get	("/v1.0/id/:id/ch",		http_helper.get_chs);

		//
		// timestamp & value options
		//

		restserver.post	(config["rest_post_url"],		http_helper.post_response);
		restserver.put	(config["rest_post_url"],		http_helper.post_response);
		restserver.get	("/v1.0/id/:id/sensor/:sensor",	http_helper.get_response);
		restserver.del	("/v1.0/id/:id/sensor/:sensor",	http_helper.del_response);


		//
		// server listening
		//

		restserver.listen(config["rest_port"], function() {
			console.log('%s listening at %s', restserver.name, restserver.url);
		});
	}
};

module.exports = rest;
