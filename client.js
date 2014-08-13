const coap  = require('coap') 
    , req   = coap.request('coap://localhost/World')

req.on('response', function(res) {
  res.pipe(process.stdout)
})

req.end()