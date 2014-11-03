var rq = require('../../lib/coap/coap_request_handler.js');

describe('query data status code test', function() {

	var res = function(){};
	res.end = function(){};

	it('should call the choice result function', function(done) {
		var accept = "application/json";
		rq.choiceResult(accept, function(){
			done();
		});
	});

	it('should call the method not support', function(done) {
		var req = function(){};
		rq.methodNotSupport(res, req);
		done();
	});
});