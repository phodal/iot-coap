var sqlite3 = require('sqlite3').verbose();
var _       = require("underscore");
var config  = require('../iot').config;
var MongoClient     = require('mongodb').MongoClient;
var mongodb_url = 'mongodb://127.0.0.1:27017/' + config.mongodb_name.toString();

function DBHelper() {
    'use strict';
    return;
}

function generateDBKey(this_block) {
    'use strict';
    var str = "";
    _.each(this_block, function (key) {
        str += key + ",";
    });
    str = str.substring(0, str.length - 1);
    return str;
}

DBHelper.postData = function (block, callback) {
    'use strict';
    var db = new sqlite3.Database(config.db_name);
    var str = generateDBKey(config.keys);
    var string = generateDBKey(block);
    var insert_db_string = "insert or replace into " + config.table_name + " (" + str + ") VALUES (" + string + ");";
    console.log(insert_db_string);
    db.all(insert_db_string, function (err) {
        if (err !== null) {
            console.log(err);
        }
        db.close();
        callback();
    });
};


DBHelper.deleteData = function (url, callback) {
    'use strict';
    var db = new sqlite3.Database(config.db_name);

    console.log("DELETE FROM  " + config.table_name + "  where " + url.split('/')[1] + "=" + url.split('/')[2]);
    var insert_db_string = "DELETE FROM  " + config.table_name + "  where " + url.split('/')[1] + "=" + url.split('/')[2];
    console.log(insert_db_string);
    db.all(insert_db_string, function (err) {
        if (err !== null) {
            console.log(err);
        }
        db.close();
        callback();
    });
};

function mongodb_getdata(url, db_callback) {
    'use strict';
    MongoClient.connect(mongodb_url, function (err, db) {
        if (err) {
            throw err;
        }
        var findDocuments = function (db, callback) {
            var collection = db.collection('documents');
            var query = {};
            var element = url.split('/')[1].toString();
            var element_value = url.split('/')[2];
            query[element] = parseInt(element_value, 10);
            collection.find(query).toArray(function (err, docs) {
                console.log("Found the following records");
                callback(docs[0]);
            });
        };
        findDocuments(db, function (docs) {
            console.dir(docs);
            delete docs._id;
            db_callback(JSON.stringify(docs));
            db.close();
        });
    });
}

DBHelper.getData = function (url, db_callback) {
    'use strict';
    var db = new sqlite3.Database(config.db_name);
//    mongodb_getdata(url, db_callback);
    console.log("SELECT * FROM " + config.table_name + " where " + url.split('/')[1] + "=" + url.split('/')[2]);
    db.all("SELECT * FROM  " + config.table_name + "  where " + url.split('/')[1] + "=" + url.split('/')[2], function (err, rows) {
        if (err !== null) {
            console.log(err);
        }
        db.close();
        db_callback(JSON.stringify(rows));
    });
};

module.exports = DBHelper;
