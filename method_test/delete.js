var coap = require('coap');
var request = coap.request;

var req = request({
    hostname: 'localhost',
    port:5683,
    pathname: '/id/1',
    method: 'DELETE'
});

req.setHeader("Accept", "application/json");
var bl = require('bl');

req.on('response', function(res) {
    res.pipe(bl(function(err, data) {
//        var json = JSON.parse(data);
        console.log(data);
        process.exit(0);
    }));

});

req.end();