var coap = require('coap');
var requestURI = 'coap://localhost/';
var name = 'World';
var url = require('url').parse(requestURI + 'id/' + name);
var req = coap.request(url);
var bl = require('bl');

req.on('response', function(res) {
	res.pipe(bl(function(err, data) {
		var json = JSON.parse(data);
		console.log(json);
		process.exit(0);
	}));

});

req.end();