const coap     = require('coap')
      ,request  = coap.request
      ,bl       = require('bl')
      ,req = request({hostname: 'localhost',port:5683,pathname: '',method: 'POST'});

req.setOption('Block2',  [new Buffer('1'),new Buffer("'must'"), new Buffer('23'), new Buffer('12')]);
req.setHeader("Accept", "application/json");
req.on('response', function(res) {
    res.pipe(bl(function(err, data) {
        console.log(data);
        process.exit(0);
    }));

});

req.end();