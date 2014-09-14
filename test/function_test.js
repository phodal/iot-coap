var iotcoap        = require('../index');
var http           = require('http');
var bl             = require('bl');

describe('function test', function () {
    before(function() {
        this.server = iotcoap.rest;
        this.server.run();
    });

    it('should return 200 when start rest server', function (done) {
        http.get('http://localhost:8848/', function (res) {
            assert(200, res.statusCode);
            done();
        });
    });

    it('should return 200 when start rest server', function (done) {
        http.get('http://localhost:8848/id/1', function (res) {
            res.pipe(bl(function(err, data) {
                var json = JSON.parse(data);
                console.log(json);
                assert("Cannot read property 'db_name' of undefined", json);
            }));
            done();
        });
    });


});