var iotcoap        = require('../index');
var http           = require('http');
var bl             = require('bl');

describe('rest function test', function () {
    before(function() {

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
                assert(1, json.id);
            }));
            done();
        });
    });
});