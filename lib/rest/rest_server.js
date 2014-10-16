var restify         = require('restify');
var restserver      = restify.createServer();
var config          = require("../../iot").config;

function rest() {
    'use strict';
    return;
}

rest.run = function () {
    'use strict';
    var rest_helper = require("./rest_helper.js");

    restserver.use(restify.gzipResponse());
    restserver.use(restify.bodyParser());
    restserver.use(restify.acceptParser(['json', 'application/json']));

    restserver.get(config.rest_url,       rest_helper.get_respond);
    restserver.put(config.rest_post_url,  rest_helper.post_respond);
    restserver.del(config.rest_url,       rest_helper.del_respond);
    restserver.post(config.rest_post_url, rest_helper.post_respond);
    restserver.head(config.rest_url,      rest_helper.respond);

    restserver.listen(config.rest_port, function () {
        console.log('%s listening at %s', restserver.name, restserver.url);
    });

};

module.exports = rest;