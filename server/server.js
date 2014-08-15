var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = "./iot.json";
var _ = require("underscore");

fs.readFile(file, 'utf8', function(err, data) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }
    config = JSON.parse(data);
    start_server();
});

function parse_url(url, callback) {
    var db = new sqlite3.Database(config["db_name"]);

    var result = [];
    console.log("SELECT * FROM basic where " + url.split('/')[1] + "=" + url.split('/')[2]);
    db.all("SELECT * FROM basic where " + url.split('/')[1] + "=" + url.split('/')[2], function(err, rows) {
        db.close();
        callback(JSON.stringify(rows));
    });
}

function start_server() {

    var db = new sqlite3.Database(config["db_name"]);
    var create_table = 'create table if not exists basic (' + config["db_table"] + ');';
    console.log(create_table);

    db.serialize(function() {
        db.run(create_table);
        _.each(config["init_table"], function(insert_data) {
            db.run(insert_data);
        });
    });

    db.close();

    var coap = require('coap');
    var server = coap.createServer({});

    server.on('request', function(req, res) {
        console.log(req.headers);
        if (req.headers['GET'] !== 0) {
            res.setOption('Accept', 'application/json');
            parse_url(req.url, function(result) {
                if( result.length == 2){
                    res.code = '4.04';
                    return res.end(JSON.stringify({
                        error: "Not Found"
                    }));
                }
                res.code = '2.05';
                return res.end(result);
            });
        }else {
            res.end(JSON.stringify({
                error: "sorry"
            }));
        }
    });

    server.listen(function() {
        console.log('server started');
    });

}