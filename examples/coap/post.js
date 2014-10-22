var coap     = require('coap');
var request  = coap.request;
var bl       = require('bl');
var req = request({hostname: 'localhost',port:5683,pathname: '',method: 'POST'});

req.setHeader("Accept", "application/json");
req.setOption('Block2',  [new Buffer('3'),new Buffer("'must'"), new Buffer('23'), new Buffer('12')]);
req.on('response', function(res) {
    res.pipe(bl(function(err, data) {
        console.log(data);
        process.exit(0);
    }));

});

req.end();