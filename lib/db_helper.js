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

function mongodb_postData(convertedData, callback) {
    'use strict';
    MongoClient.connect(mongodb_url, function (err, db) {
        if (err) {
            throw err;
        }
        console.log("connect:" + convertedData);
        var updateDocument = function (db, mongodb_callback) {
            var collection = db.collection('documents');
            console.log("in update:" + convertedData);
            collection.update({}, { $set: convertedData}, function (err, docs) {
                console.log("Found the following records");
                console.log(docs);
                mongodb_callback(docs);
            });
        };
        updateDocument(db, function (docs) {
            console.log("update:" + convertedData);
            console.dir(docs);
            delete docs._id;
            callback(JSON.stringify(docs));
            db.close();
        });
    });
}

function generateDBMap(str, string) {
    'use strict';
    var result = {};
    _.each(config.keys, function (key, index) {
        result[key] = string.split(',')[index];
    });
    return result;
}

DBHelper.postData = function (block, callback) {
    'use strict';
    var db = new sqlite3.Database(config.db_name);
    var str = generateDBKey(config.keys);
    var string = generateDBKey(block);

//    var convertedData = generateDBMap(str, string);
//    mongodb_postData(convertedData, callback);
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

function mongodb_deletedata(url, db_callback) {
    'use strict';
    MongoClient.connect(mongodb_url, function (err, db) {
        if (err) {
            throw err;
        }
        var removeDocuments = function (db, callback) {
            var collection = db.collection('documents');
            var query = {};
            var element = url.split('/')[1].toString();
            var element_value = url.split('/')[2];
            query[element] = parseInt(element_value, 10);
            collection.remove(query, function (err, result) {
                console.log("Found the following records");
                callback(result);
            });
        };
        removeDocuments(db, function (result) {
            db.close();
        });
    });
}

DBHelper.deleteData = function (url, callback) {
    'use strict';
    var db = new sqlite3.Database(config.db_name);

//    mongodb_deletedata(url, null);
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
