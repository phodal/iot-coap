var http           = require('http');
var bl             = require('bl');
var restify        = require('restify');

const iotcoap         = require('../../index');
iotcoap.rest.run();

describe('rest function test', function () {
    before(function() {

    });

    it('should return 200 when start rest server', function (done) {
        http.get('http://localhost:8848/', function (res) {
            assert(200, res.statusCode);
            done();
        });
    });

    it('should return sensors 20 when post data & id = 10', function (done) {
        var post_data = JSON.stringify({
            id: 10,
            value: 'is id 1',
            sensors1: 19,
            sensors2: 20
        });

        var post_options = {
            host: 'localhost',
            port: '8848',
            path: '',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        var post_req = http.request(post_options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
            });
        });

        post_req.write(post_data);
        post_req.end();

        http.get('http://localhost:8848/id/10', function (res) {
            res.pipe(bl(function(err, data) {
                var json = JSON.parse(data)[0];
                if(json.sensors2 === 20){
                    done();
                }
            }));
        });
    });
});
//
//var client = restify.createJsonClient({
//    url: 'http://127.0.0.1:8848/',
//    version: '*'
//});
//
//describe('User Login Test', function() {
//    it('should return login success', function () {
//        client.post();
//    });
//});