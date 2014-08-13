var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('iot.db');

const coap        = require('coap')
    , server  = coap.createServer()

server.on('request', function(req, res) {
  res.end('Hello ' + req.url.split('/')[1] + '\n')
})

server.listen(function() {
  console.log('server started')
})