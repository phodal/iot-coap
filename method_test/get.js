const coap       = require('coap')
     ,requestURI = 'coap://localhost/'
     ,url        = require('url').parse(requestURI + 'id/2/')
     ,req        = coap.request(url)
     ,bl         = require('bl');

req.setOption('Block2',  new Buffer([0x2]));
req.setHeader("Accept", "application/json");
req.on('response', function(res) {
	res.pipe(bl(function(err, data) {
		var json = JSON.parse(data);
		console.log(json);
	}));

});
req.end();
