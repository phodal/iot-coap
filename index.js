var coap            = require('coap');
var rest            = require('./lib/rest_server');
var iotcoap         = require('./lib/coap_server');
var config          = require('./iot').config;
var sqlite3         = require('sqlite3').verbose();
var _               = require("underscore");
var MongoClient     = require('mongodb').MongoClient;

var mongodbURL = 'mongodb://127.0.0.1:27017/' + config.mongodb_name.toString();

function mongodb_init() {
    'use strict';
    MongoClient.connect(mongodbURL, function (err, db) {
        if (err) {
            throw err;
        }
        var insertDocuments = function (db, callback) {
            var collection = db.collection('documents');
            collection.insert(config.mongodb_init, function (err, docs) {
                callback(docs);
            });
        };
        var findDocuments = function (db, callback) {
            var collection = db.collection('documents');
            collection.find(config.mongodb_init[0]).toArray(function (err, docs) {
                console.log("Found the following records");
                if (_.isEmpty(docs)) {
                    insertDocuments(db, function (docs) {
                        db.close();
                    });
                }
                callback(docs);
            });
        };
        findDocuments(db, function (docs) {
            db.close();
        });
    });
}

//mongodb_init();

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