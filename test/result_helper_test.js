var resultReturn = require('../lib/coap_result_helper.js');

describe('query data status code test', function() {

    var res = function(){};
    res.end = function(){};

    it('should return 4.04 when result empty', function() {
        var request = "[]";
        resultReturn.returnGETStatus(request, res);
        var result = res.code;
        expect(result).to.eql("4.04");
    });

    it('should return 2.05 when result empty', function() {
        var request = "[{hello:'world'}]";
        resultReturn.returnGETStatus(request, res);
        var result = res.code;
        expect(result).to.eql("2.05");
    });

    it('should return 2.05 when delete result', function() {
        var request = "";
        resultReturn.returnDeleteStatus(request, res);
        var result = res.code;
        expect(result).to.eql("2.05");
    });

    it('should return 2.05 when save result', function() {
        var request = "";
        resultReturn.returnPOSTStatus(request, res);
        var result = res.code;
        expect(result).to.eql("2.05");
    });
});