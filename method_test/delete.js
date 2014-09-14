const coap      = require('coap')
      ,request  = coap.request
      ,bl       = require('bl')
      ,req = request({hostname: 'localhost',port:5683,pathname: '/id/3',method: 'DELETE'});

req.setHeader("Accept", "application/json");

req.on('response', function(res) {
    res.pipe(bl(function(err, data) {
        console.log(data);
        process.exit(0);
    }));

});

req.end();