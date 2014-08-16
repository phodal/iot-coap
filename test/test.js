var QueryData = require('../server/QueryData.js');

describe('query data status code test', function() {

    var res = function(){};
    res.end = function(){};

    it('should return 4.04 when result empty', function(done) {
        var request = "[]";
        QueryData.returnJSON(request, res);
        var result = res.code;
        expect(result).to.eql("4.04");
        done();
    });

    it('should return 2.05 when result empty', function(done) {
        var request = "[{hello:'world'}]";
        QueryData.returnJSON(request, res);
        var result = res.code;
        expect(result).to.eql("2.05");
        done();
    });

});