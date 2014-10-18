var URI           = require('URIjs');
var _             = require('underscore');
var config        = require("../iot").config;

function URLHandler() {
    'use strict';
    return;
}

URLHandler.getKeyFromURL = function (url) {
    'use strict';
    return url.split('/')[1];
};

URLHandler.url_sanity_check = function (url) {
    'use strict';
    if (URLHandler.getValueFromURL(url) === false) {
        return false;
    }
    _.each(config.keys, function (array, index) {
        if (URLHandler.getKeyFromURL(url) === config.keys[index]) {
            return true;
        }
    });
};

URLHandler.getValueFromURL = function (url) {
    'use strict';
    return url.split('/')[2];
};

module.exports = URLHandler;
