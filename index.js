var coap            = require('coap');
var rest            = require('./lib/rest_server');
var iotcoap         = require('./lib/coap_server');
var config          = require('./iot').config;
var sqlite3         = require('sqlite3').verbose();
var _               = require("underscore");

var db = new sqlite3.Database(config.db_name);
var create_table = 'create table if not exists ' + config.table_name + '(' + config.db_table + ');';

db.serialize(function () {
    'use strict';
    db.run(create_table);
    _.each(config.init_table, function (insert_data) {
        db.run(insert_data);
    });
});
db.close();

module.exports =  iotcoap;
module.exports.rest = rest;