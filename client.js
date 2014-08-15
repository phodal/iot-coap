var coap = require('coap');
var requestURI = 'coap://localhost/';
var url = require('url').parse(requestURI + 'id/1/');
console.log("Request URL: " + url.href);
var req = coap.request(url);
req.setHeader("Accept", "application/json");
var bl = require('bl');

req.on('response', function(res) {
	res.pipe(bl(function(err, data) {
		var json = JSON.parse(data);
		console.log(json);
		process.exit(0);
	}));

});

req.end();