var coap = require('coap');
var requestURI = 'coap://localhost/';
var url = require('url').parse(requestURI + 'id/1/');
console.log("Request URL: " + url.href);
var req = coap.request(url);
var bl = require('bl');

req.setHeader("Accept", "application/json");
req.on('response', function(res) {
	res.pipe(bl(function(err, data) {
		var json = JSON.parse(data);
		console.log(json);
	}));

});

req.end();

var req2 = coap.request(url);
req2.setHeader("Accept", "application/xml");
req2.on('response', function(res2) {
    res2.pipe(bl(function(err, data) {
        console.log("XML:" + data);
    }));

});

req2.end();