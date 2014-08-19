var coap = require('coap');
var request = coap.request;
const dgram    = require('dgram')
    , parse    = require('coap-packet').parse;

var req = request({
    hostname: 'localhost',
    port:5683,
    pathname: '',
    method: 'POST'
});

req.setOption('Block2',  [new Buffer('1'),new Buffer('ghi'), new Buffer('13'), new Buffer('12')]);
req.setHeader("Accept", "application/json");
var bl = require('bl');

req.on('response', function(res) {
    res.pipe(bl(function(err, data) {
        console.log(data);
        var json = JSON.parse(data);
        console.log(data);
        process.exit(0);
    }));

});

req.end();