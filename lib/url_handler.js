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
    var result;
    if (url === "") {
        result = false;
    }
    _.each(config.keys, function (array, index) {
        if (URLHandler.getKeyFromURL(url) === config.keys[index]) {
            result = true;
        }
    });
    return result;
};

URLHandler.getValueFromURL = function (url) {
    'use strict';
    return url.split('/')[2];
};

module.exports = URLHandler;
