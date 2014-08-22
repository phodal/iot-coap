var coap = require('coap');
var request = coap.request;

var req = request({
    hostname: 'localhost',
    port:5683,
    pathname: '',
    method: 'PUT'
});

req.setHeader("Accept", "application/json");
var bl = require('bl');

req.setOption('Block2',  [new Buffer('3'),new Buffer("'phodal'"), new Buffer('13'), new Buffer('12')]);
req.on('response', function(res) {
    res.pipe(bl(function(err, data) {
//        var json = JSON.parse(data);
        console.log(data);
        process.exit(0);
    }));

});

req.end();