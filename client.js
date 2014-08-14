var coap  = require('coap');
var requestURI = 'coap://localhost/';
var name = 'World';
var url = require('url').parse(requestURI + name);
var req = coap.request(url);

coap.registerFormat('application/json', 50);

req.on('response', function(res) {
    console.log(req);
    res.pipe(process.stdout);
});

req.end();