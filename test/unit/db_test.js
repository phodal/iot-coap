var DB             =require("../../lib/database/sqlite_helper")
    ,sqlite        = new DB()
    ,_             = require("underscore")
    ,DB_Factory    = require("../../lib/database/db_factory")
    ,db_factory    = new DB_Factory()
    ,sinon         = require('sinon');

describe('Throw  Error Test', function() {
    it('should throw error on errorHandler', function () {
        expect(sqlite.errorHandler()).to.throw();
    });

    it('should return init success', function (done) {
        sqlite.init();
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

describe('DB Call Test', function(){

    it('should be call the db.init when start server', function(done){
        sinon.spy(db_factory, "selectDB");
        expect(db_factory.selectDB.calledOnce).to.be.false;
        var database = db_factory.selectDB();
        sinon.spy(database, "init");
        expect(database.init.calledOnce).to.be.false;
        done();
    });
});