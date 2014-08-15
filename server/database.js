var sqlite3 = require('sqlite3').verbose();
var file = "./iot.json";

var db = new sqlite3.Database(config["db_name"]);
var create_table = 'create table if not exists basic (' + config["db_table"] + ');';
console.log(create_table);

db.serialize(function() {
    db.run(create_table);
    _.each(config["init_table"], function(insert_data){
        db.run(insert_data);
    });
});

db.close();