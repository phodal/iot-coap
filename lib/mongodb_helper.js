var config          = require('../iot').config;
var MongoClient     = require('mongodb').MongoClient;
var mongodb_url     = 'mongodb://127.0.0.1:27017/' + config.mongodb_name.toString();
var _               = require("underscore");

function MongoDBHelper() {
    'use strict';
    return;
}

function errorHandler(err) {
    'use strict';
    if (err) {
        throw err;
    }
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

function generateDBMap(str, string) {
    'use strict';
    var result = {};
    _.each(config.keys, function (key, index) {
        result[key] = string.split(',')[index];
    });
    return result;
}

MongoDBHelper.deleteData = function (url, callback) {
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
                callback(result);
            });
        };
        removeDocuments(db, function (docs) {
            delete docs._id;
            db.close();
            callback();
        });
    });
};

MongoDBHelper.getData = function (url, callback) {
    'use strict';
    MongoClient.connect(mongodb_url, function (err, db) {
        errorHandler(err);

        var findDocuments = function (db, mongo_callback) {
            var collection = db.collection('documents');
            var query = {};
            var element = url.split('/')[1].toString();
            var element_value = url.split('/')[2];
            query[element] = parseInt(element_value, 10);
            collection.find(query).toArray(function (err, docs) {
                mongo_callback(docs);
            });
        };
        findDocuments(db, function (docs) {
            delete docs._id;
            db.close();
            callback(JSON.stringify(docs));
        });
    });
};

MongoDBHelper.postData = function (block, callback) {
    'use strict';
    var str = generateDBKey(config.keys);
    var string = generateDBKey(block);
    var convertedData = generateDBMap(str, string);

    MongoClient.connect(mongodb_url, function (err, db) {
        errorHandler(err);

        var updateDocument = function (db, mongodb_callback) {
            var collection = db.collection('documents');
            collection.update({}, { $set: convertedData}, function (err, docs) {
                mongodb_callback(docs);
            });
        };

        updateDocument(db, function (docs) {
            delete docs._id;
            callback(JSON.stringify(docs));
            db.close();
        });
    });
};

MongoDBHelper.init = function () {
    'use strict';
    MongoClient.connect(mongodb_url, function (err, db) {
        errorHandler(err);

        var insertDocuments = function (db, callback) {
            var collection = db.collection('documents');
            collection.insert(config.mongodb_init, function (err, docs) {
                callback(docs);
            });
        };

        var findDocuments = function (db, callback) {
            var collection = db.collection('documents');
            collection.find(config.mongodb_init[0]).toArray(function (err, docs) {
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

