var URLHandler = require('../../lib/url_handler.js');

describe('test url handler', function() {
    var url = '/id/1';

    it('should return \'id\' when get key from url', function() {
        var result = URLHandler.getKeyFromURL(url);
        expect(result).to.eql('id');
    });

    it('should return 1 when get key from url', function() {
        var result = URLHandler.getValueFromURL(url);
        expect(result).to.eql('1');
    });

    it('should return false when url empty', function() {
        var url = "";
        var result = URLHandler.url_sanity_check(url);
        expect(result).to.eql(false);
    });

    it('should return false when url no match', function() {
        var url = "id";
        var result = URLHandler.url_sanity_check(url);
        expect(result).to.eql(undefined);
    });

    it('should return true when url match', function() {
        var result = URLHandler.url_sanity_check(url);
        expect(result).to.eql(true);
    });

});