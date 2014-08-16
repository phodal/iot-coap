var coap = require('coap');
var request = coap.request;

var req = request({
    hostname: 'localhost',
    port:5683,
    pathname: '',
    method: 'POST'
});

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