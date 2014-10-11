var config          = require('../iot').config;
var MongoClient     = require('mongodb').MongoClient;
var mongodb_url     = 'mongodb://127.0.0.1:27017/' + config.mongodb_name.toString();
var _               = require("underscore");

function MongoDBHelper() {
    'use strict';
    return;
}

MongoDBHelper.deleteData = function(url, db_callback) {
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
};

MongoDBHelper.getData = function(url, callback) {
    'use strict';
    MongoClient.connect(mongodb_url, function (err, db) {
        if (err) {
            throw err;
        }
        var findDocuments = function (db, mongo_callback) {
            var collection = db.collection('documents');
            var query = {};
            var element = url.split('/')[1].toString();
            var element_value = url.split('/')[2];
            query[element] = parseInt(element_value, 10);
            collection.find(query).toArray(function (err, docs) {
                console.log("Found the following records");
                mongo_callback(docs[0]);
            });
        };
        findDocuments(db, function (docs) {
            console.dir(docs);
            delete docs._id;
            callback(JSON.stringify(docs));
            db.close();
        });
    });
};

MongoDBHelper.postData = function(convertedData, callback) {
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
};

MongoDBHelper.init = function() {
    MongoClient.connect(mongodb_url, function (err, db) {
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
                    insertDocuments(db, function () {
                        db.close();
                    });
                }
                callback(docs);
            });
        };
        findDocuments(db, function () {
            db.close();
        });
    });
};

module.exports = MongoDBHelper;

