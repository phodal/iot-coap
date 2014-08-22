const fs              = require('fs')
     ,file            = './iot.json'
     ,restify         = require('restify')
     ,restserver      = restify.createServer();

function rest(){

}

rest.run = function(){
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }

        var config = JSON.parse(data);
        module.exports.config = config;
        startRESTIOT(config);
    });

    function startRESTIOT(config){
        const rest_helper = require("./rest_helper.js");

        restserver.use(restify.gzipResponse());
        restserver.use(restify.bodyParser());
        restserver  .use(restify.acceptParser(['json', 'application/json']));

        restserver.get(config["rest_url"],       rest_helper.get_respond);
        restserver.put(config["rest_post_url"],  rest_helper.post_respond);
        restserver.del(config["rest_url"],       rest_helper.del_respond);
        restserver.post(config["rest_post_url"], rest_helper.post_respond);
        restserver.head(config["rest_url"],      rest_helper.respond);

        restserver.listen(config["rest_port"], function() {
            console.log('%s listening at %s', restserver.name, restserver.url);
        });
    }
};

module.exports = rest;