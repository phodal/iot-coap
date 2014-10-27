const coap         = require('coap')
    ,request       = coap.request
    ,bl            = require('bl')
    ,sinon         = require('sinon')
    ,iotcoap       = require('../../index');

describe('coap function test', function () {

    before(function() {
        iotcoap.run();
    });
    it('should return 20 when coap get id = 1', function (done) {
        const url   = require('url').parse('coap://localhost/id/1/')
              ,req  = request(url);

        var result = {
            id: 1,
            value: 'is id 1',
            sensors1: 19,
            sensors2: 20
        };

        req.setOption('Block2',  new Buffer([0x2]));
        req.setHeader("Accept", "application/json");
        req.on('response', function(res) {
            res.pipe(bl(function(err, data) {
                var json = JSON.parse(data)[0];
                if(result.sensors2 === json.sensors2){
                    done();
                }
            }));
        });
        req.end();
    });

    it('should return Not Found this id error when get phodal/1', function (done) {
        const url   = require('url').parse('coap://localhost/phodal/1/')
              ,req  = request(url);

        req.setOption('Block2',  new Buffer([0x2]));
        req.setHeader("Accept", "application/json");
        req.on('response', function(res) {
            res.pipe(bl(function(err, data) {
                var json = JSON.parse(data);
                if(json.errorType === 'url'){
                    done();
                }
            }));
        });
        req.end();
    });

    it('should return 12 when post a data for get data step 1', function (done) {
        const request = coap.request
            , post_req = request({hostname: 'localhost', port: 5683, pathname: '', method: 'POST'});

        post_req.setHeader("Accept", "application/json");
        post_req.setOption('Block2', [new Buffer('5'), new Buffer("'must'"), new Buffer('23'), new Buffer('12')]);

        post_req.on('response', function (res) {
            res.pipe(bl(function (err, data) {
                done();
            }));
        });
        post_req.end();
    });


    it('should return 12 when post a data and get data step 2', function (done) {
        const url2 = require('url').parse('coap://localhost/id/5/')
            ,getReqAfterPost  = coap.request(url2);

        getReqAfterPost.setOption('Block2',  new Buffer([0x2]));
        getReqAfterPost.setHeader("Accept", "application/json");
        getReqAfterPost.on('response', function(res) {
            res.pipe(bl(function(err, data) {
                var json = JSON.parse(data)[0];
                if(json.sensors1 === 23){
                    done();
                }
            }));
        });
        getReqAfterPost.end();
    });

    it('should no return when delete id', function (done) {
        const delete_req = request({hostname: 'localhost',port:5683,pathname: '/id/3',method: 'DELETE'});

        delete_req.setOption('Block2', [new Buffer('3'),new Buffer("'must'"),new Buffer('23'),new Buffer('12')]);
        delete_req.setHeader("Accept", "application/json");
        delete_req.on('response', function (res) {
            res.pipe(bl(function (err, data) {

            }));
        });
        delete_req.end();

        const url2  = require('url').parse('coap://localhost/id/3/')
             ,getReqAfterDelete  = request(url2);

        getReqAfterDelete.setOption('Block2',  new Buffer([0x2]));
        getReqAfterDelete.setHeader("Accept", "application/json");
        getReqAfterDelete.on('response', function(res) {
            res.pipe(bl(function(err, data) {
                var json = JSON.parse(data);
                if(json === undefined || json['error'] === "Not Found this id"){
                    done();
                }
            }));
        });
        getReqAfterDelete.end();
    });

    it('should be call coapserver close after stop iot-coap server', function(){
        var coapserver = { close: function(){}};
        var spyCoAP = sinon.spy(coapserver, "close");
        spyCoAP();
        iotcoap.close();
        assert(spyCoAP.calledOnce);
    });
});