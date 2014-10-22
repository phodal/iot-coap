var coap      = require('coap');
var request   = coap.request;
var bl        = require('bl');
var req       = request({hostname: 'localhost',port:5683,pathname: '/id/10',method: 'DELETE'});

req.setHeader("Accept", "application/json");

req.on('response', function(res) {
    res.pipe(bl(function(err, data) {
        var json = JSON.parse(data);
        console.log(json);
        process.exit(0);
    }));

});

req.end();