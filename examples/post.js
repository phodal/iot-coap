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

req.setOption('Block3',  new Buffer(0x55));
req.setOption('Block2',  new Buffer('abcd'));
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