const fs			  = require('fs')
	 ,file			  = './iot.json'
	 ,restify		  = require('restify')
	 ,restserver	  = restify.createServer();

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
		const rest_helper = require("./rest_helper.js");

        		restserver  .use(restify.acceptParser(['json', 'application/json']));
		restserver.use(restify.dateParser());
		restserver.use(restify.queryParser());
		restserver.use(restify.gzipResponse());
		restserver.use(restify.bodyParser());

		restserver.get("/html/:html", 	restify.serveStatic({'directory': 'web'}));
		restserver.get("/v1.0/id/:id/sensor/:sensor",	rest_helper.get_response);
		restserver.put(config["rest_post_url"],			rest_helper.post_response);
		restserver.del("/v1.0/id/:id/sensor/:sensor",	rest_helper.del_response);
		restserver.post(config["rest_post_url"],			rest_helper.post_response);
		restserver.head("/v1.0/id/:id/sensor/:sensor",	rest_helper.response);

		restserver.listen(config["rest_port"], function() {
			console.log('%s listening at %s', restserver.name, restserver.url);
		});
	}
};

module.exports = rest;