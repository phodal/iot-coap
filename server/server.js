var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = "./iot.json";

fs.readFile(file, 'utf8', function(err, data) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }
    config = JSON.parse(data);
    start_server();
});

function start_server() {

    var db = new sqlite3.Database(config["db_name"]);
    var create_table = 'create table if not exists basic (' + config["db_table"] + ');';
    console.log(create_table);

    db.serialize(function() {
        db.run(create_table);
    });

    db.close();

    var coap = require('coap');
    var server = coap.createServer({});

    server.on('request', function(req, res) {
        if (req.headers['GET'] !== 0) {
            res.end('GET ' + req.url.split('/')[1] + '\n');
            res.code = '4.06';
        } else {
            res.end('Hello ' + req.url.split('/')[1] + '\n');
        };

        res.setOption('Content-Format', 'application/json');

        res.end(JSON.stringify({
            hello: "world"
        }));
    });

    server.listen(function() {
        console.log('server started');
    });

}