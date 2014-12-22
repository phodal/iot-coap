var DB             =require("../../lib/database/sqlite_helper")
    ,sqlite        = new DB()
    ,_             = require("underscore");

describe('Throw  Error Test', function() {
    this.timeout(500);

    it('should give more info', function(done) {
        done();
    });


    it('should throw error on errorHandler', function () {
        expect(sqlite.errorHandler()).to.throw();
    });

    it('should return init success', function (done) {
        sqlite.getData("/id/1", function (result) {
            if (JSON.parse(result)[0].id === 1) {
                done();
            }
        })
    });

    it('should return id = 12 when post', function (done) {
        sqlite.postData(['12', '\'must\'', '23', '12'], function () {
            done();
        });
    });
});
describe('DB Test', function() {
    it('should return id = 12 when get', function (done) {
        sqlite.getData("/id/12", function (result) {
            if (JSON.parse(result)[0].id === 12) {
                done();
            }
        })
    });

    it('should return id = null when delete id', function (done) {
        sqlite.deleteData("/id/12", function(result){
            done();
        });
        sqlite.getData("/id/12", function(result){
            if(_.isEmpty(JSON.parse(result)) ){
                done();
            }
        })
    });
});
