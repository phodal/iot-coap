var URI     = require('URIjs');


function URLHandler() {
    'use strict';
    return;
}

URLHandler.getKeyFromURL = function (url) {
    'use strict';
    return url.split('/')[1];
};

URLHandler.getValueFromURL = function (url) {
    'use strict';
    return url.split('/')[2];
};


module.exports = URLHandler;
