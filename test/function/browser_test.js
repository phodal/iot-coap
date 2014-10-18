var Browser = require('zombie');
browser = new Browser();

describe('Load Page Test', function(){
    it('load id = 2 page', function(done){
        browser.visit("http://localhost:8848/id/1/", function () {
//            assert.ok(this.browser.success);
            done();
        });
    });
});